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
    const { type, context, options } = body;

    let systemPrompt = '';
    let userPrompt = '';

    switch (type) {
      case 'bullet_points':
        systemPrompt = `You are an expert resume writer. Generate professional, achievement-focused bullet points for a resume. Use action verbs and include metrics when possible. Make them concise and impactful.`;
        userPrompt = `Generate 3-5 professional bullet points for this role:
Position: ${context.position || 'Not specified'}
Company: ${context.company || 'Not specified'}
Responsibilities: ${context.responsibilities?.join(', ') || 'General responsibilities'}

Tone: ${options?.tone || 'professional'}
Focus on achievements and quantifiable results.`;
        break;

      case 'summary':
        systemPrompt = `You are an expert resume writer. Create compelling professional summaries that highlight key skills, experience, and career goals.`;
        userPrompt = `Create a professional summary for this candidate:
Position/Title: ${context.position || 'Professional'}
Years of Experience: ${context.yearsOfExperience || 'Several'}
Key Skills: ${context.skills?.join(', ') || 'Various skills'}
Industry: ${context.industry || 'General'}

Tone: ${options?.tone || 'professional'}
Length: ${options?.length || 'medium'} (2-4 sentences)`;
        break;

      case 'full_resume':
        systemPrompt = `You are an expert resume writer and career coach. Generate complete resume content based on job descriptions and candidate information.`;
        userPrompt = `Generate resume content for this job posting:

Job Description:
${context.jobDescription}

Create sections for:
- Professional Summary (2-3 sentences)
- Key Skills (10-15 relevant skills)
- Work Experience (2-3 sample positions with 4-5 bullet points each)

Make it tailored to the job description with relevant keywords.`;
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid generation type' },
          { status: 400 }
        );
    }

    const content = await getAICompletion({
      systemPrompt,
      userPrompt,
      maxTokens: options?.maxTokens || 1000,
      temperature: options?.temperature || 0.7,
    });

    // TODO: Log AI usage to database
    // await prisma.aiUsage.create({
    //   data: {
    //     userId: user.id,
    //     type,
    //     tokens: estimatedTokens,
    //     cost: estimatedCost,
    //   },
    // });

    return NextResponse.json({
      content,
      type,
    });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
