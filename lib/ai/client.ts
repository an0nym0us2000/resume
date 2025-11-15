import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

// OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Anthropic client
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Determine which AI service to use
export const AI_SERVICE = process.env.ANTHROPIC_API_KEY ? 'anthropic' : 'openai';

export interface AICompletionParams {
  systemPrompt?: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
}

export async function getAICompletion({
  systemPrompt,
  userPrompt,
  maxTokens = 2000,
  temperature = 0.7,
}: AICompletionParams): Promise<string> {
  if (AI_SERVICE === 'anthropic' && process.env.ANTHROPIC_API_KEY) {
    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022',
      max_tokens: maxTokens,
      temperature,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      system: systemPrompt,
    });

    const content = response.content[0];
    return content.type === 'text' ? content.text : '';
  } else if (process.env.OPENAI_API_KEY) {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    if (systemPrompt) {
      messages.unshift({
        role: 'system',
        content: systemPrompt,
      });
    }

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages,
      max_tokens: maxTokens,
      temperature,
    });

    return response.choices[0]?.message?.content || '';
  }

  throw new Error('No AI API key configured');
}
