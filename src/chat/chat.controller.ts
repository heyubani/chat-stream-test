import {
  Controller,
  Query,
  Sse,
  MessageEvent,
  BadRequestException,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Observable } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * SSE endpoint to stream chat responses.
   */
  @Sse('stream')
  async streamMessages(
    @Query('message') message?: string,
  ): Promise<Observable<MessageEvent>> {
    const trimmed = message?.trim();

    if (!trimmed) {
      throw new BadRequestException(
        'Query parameter "message" must not be empty.',
      );
    }

    return this.chatService.streamChatResponse(trimmed);
  }
}
