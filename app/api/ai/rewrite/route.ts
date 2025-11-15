import { NextRequest, NextResponse } from 'next/server';
import { getAICompletion } from '@/lib/ai/client';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { text, type, options } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'grammar':
        systemPrompt = `You are an expert editor. Fix grammar, spelling, and punctuation errors while maintaining the original meaning and tone.`;
        userPrompt = `Fix any grammar, spelling, or punctuation errors in this text. Return only the corrected text without explanations:\n\n${text}`;
        break;

      case 'tone':
        const tone = options?.tone || 'professional';
        systemPrompt = `You are an expert resume writer. Rewrite text to match the specified tone while keeping the core message.`;
        userPrompt = `Rewrite this text in a ${tone} tone. Keep the same information but adjust the language style:\n\n${text}`;
        break;

      case 'industry':
        const industry = options?.industry || 'general';
        systemPrompt = `You are an expert resume writer with deep knowledge of industry-specific terminology and best practices.`;
        userPrompt = `Rewrite this for the ${industry} industry. Use industry-appropriate terminology and keywords:\n\n${text}`;
        break;

      case 'shorten':
        systemPrompt = `You are an expert editor. Make text more concise while preserving key information and impact.`;
        userPrompt = `Make this text more concise and impactful. Remove unnecessary words:\n\n${text}`;
        break;

      case 'expand':
        systemPrompt = `You are an expert resume writer. Expand text with more details, context, and impact.`;
        userPrompt = `Expand this text with more details and context. Add metrics and achievements where appropriate:\n\n${text}`;
        break;

      case 'improve':
        systemPrompt = `You are an expert resume writer. Improve text to be more professional, impactful, and achievement-focused.`;
        userPrompt = `Improve this resume text. Make it more professional, use strong action verbs, and emphasize achievements:\n\n${text}`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid rewrite type' },
          { status: 400 }
        );
    }

    const content = await getAICompletion({
      systemPrompt,
      userPrompt,
      maxTokens: options?.maxTokens || 500,
      temperature: options?.temperature || 0.7,
    });

    // TODO: Log AI usage to database

    return NextResponse.json({
      original: text,
      rewritten: content.trim(),
      type,
    });
  } catch (error) {
    console.error('AI rewrite error:', error);
    return NextResponse.json(
      { error: 'Failed to rewrite content' },
      { status: 500 }
    );
  }
}
