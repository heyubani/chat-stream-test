import {
  ChatCompletionSystemMessageParam,
  ChatCompletionUserMessageParam,
} from 'openai/resources/chat';

export const ragDocuments = [
  {
    id: 'doc-tech',
    keywords: ['ai', 'intelligence', 'machine learning', 'technology', 'tech'],
    content:
      'Artificial intelligence (AI) is a rapidly evolving field that enables machines to perform tasks that typically require human intelligence, such as learning, problem-solving, and decision-making. Machine learning, a subset of AI, focuses on systems that learn from data.',
  },
  {
    id: 'doc-env',
    keywords: [
      'climate',
      'environment',
      'fossil fuels',
      'global warming',
      'pollution',
    ],
    content:
      'Climate change refers to long-term shifts in temperatures and weather patterns. These shifts may be natural, but since the 1800s, human activities have been the main driver of climate change, primarily due to the burning of fossil fuels like coal, oil, and gas, which produces heat-trapping gases.',
  },
  {
    id: 'doc-health',
    keywords: ['health', 'diet', 'exercise', 'well-being', 'nutrition'],
    content:
      'A balanced diet is crucial for maintaining good health and preventing various diseases. It involves consuming a variety of foods from all food groups in appropriate proportions. Regular physical activity also plays a vital role in overall well-being.',
  },
  {
    id: 'doc-general',
    keywords: ['hello', 'hi', 'how are you', 'help', 'what can you do'],
    content:
      'I am a helpful AI assistant. I can provide information on various topics, including technology, environment, and health, based on my knowledge base. How can I assist you today?',
  },
];

// Explicitly define the types of messages to avoid ambiguity with union types like ChatCompletionFunctionMessageParam
export const buildMessages = (
  contextDocument: string,
  userMessage: string,
): (ChatCompletionSystemMessageParam | ChatCompletionUserMessageParam)[] => [
  {
    role: 'system',
    content: `You are a helpful AI assistant. Based on the following context, answer the user's question. If the question cannot be answered from the context, say "I can only answer questions related to the provided context."`,
  },
  {
    role: 'user',
    content: `Context: ${contextDocument}\n\nQuestion: ${userMessage}`,
  },
];
