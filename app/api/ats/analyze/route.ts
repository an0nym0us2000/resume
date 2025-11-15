import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { analyzeResume } from '@/lib/ats/analyzer';
import { ResumeData } from '@/types/resume';

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
    const { resumeData, jobDescription } = body as {
      resumeData: ResumeData;
      jobDescription?: string;
    };

    if (!resumeData) {
      return NextResponse.json(
        { error: 'Resume data is required' },
        { status: 400 }
      );
    }

    const analysis = analyzeResume(resumeData, jobDescription);

    // TODO: Save analysis to database
    // await prisma.atsAnalysis.create({
    //   data: {
    //     resumeId: resumeId,
    //     score: analysis.score,
    //     keywords: analysis.keywords,
    //     missingKeywords: analysis.keywords.missing,
    //     suggestions: analysis.suggestions,
    //     weakSections: analysis.weakSections,
    //     impactScore: analysis.impactScore,
    //     jobDescription: jobDescription,
    //   },
    // });

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('ATS analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
