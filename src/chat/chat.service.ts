import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Observable } from 'rxjs';
import OpenAI from 'openai';
import { buildMessages, ragDocuments } from './rag.document';

@Injectable()
export class ChatService {
  private openai: OpenAI;

  constructor() {
    // Initialize OpenAI client
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  /**
   * Retrieves a relevant document based on the user's query.
   * @param query The user's input query.
   * @returns The content of the most relevant document, or a general document if no specific keywords are found.
   */
  private retrieveDocument(query: string): string {
    const lowerCaseQuery = query.toLowerCase();
    for (const doc of ragDocuments) {
      if (doc.keywords.some((keyword) => lowerCaseQuery.includes(keyword))) {
        return doc.content;
      }
    }

    // Fallback to a general document if no specific keywords are found
    return ragDocuments.find((doc) => doc.id === 'doc-general').content;
  }

  /**
   * Streams the AI's response token by token using OpenAI's API.
   * @param userMessage The message from the user.
   * @returns An Observable that emits chunks of the AI's response.
   */
  async streamChatResponse(
    userMessage: string,
  ): Promise<Observable<MessageEvent>> {
    try {
      // 1. Retrieve relevant document based on user input
      const contextDocument = this.retrieveDocument(userMessage);
      const messages = buildMessages(contextDocument, userMessage);

      // Call the OpenAI API for streaming chat completions
      const stream = await this.openai.chat.completions.create({
        model: 'gpt-4.1',
        messages: messages,
        stream: true,
      });

      // Transform the OpenAI stream into an RxJS Observable
      return new Observable<MessageEvent>((subscriber) => {
        const processStream = async () => {
          try {
            for await (const chunk of stream) {
              const content = chunk.choices[0]?.delta?.content || '';
              if (content) {
                subscriber.next({ data: content } as MessageEvent);
              }
            }
            subscriber.complete(); // Signal that the stream has ended
          } catch (error) {
            console.error('Error processing OpenAI stream:', error);
            subscriber.error(
              new InternalServerErrorException(
                'Error streaming response from OpenAI.',
              ),
            );
          }
        };

        processStream();
      });
    } catch (error) {
      console.error('Error in streamChatResponse:', error.message);
      // Check if it's an OpenAI API error
      if (error instanceof OpenAI.APIError) {
        throw new InternalServerErrorException(
          `OpenAI Error: ${error.status} -> ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'An error occurred. Please try again.',
      );
    }
  }
}
