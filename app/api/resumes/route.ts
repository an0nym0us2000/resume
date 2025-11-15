import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { ResumeData } from '@/types/resume';

// GET all resumes for the current user
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resumes = await prisma.resume.findMany({
      where: {
        userId: user.id,
        isActive: true,
      },
      include: {
        template: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return NextResponse.json(resumes);
  } catch (error) {
    console.error('Failed to fetch resumes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resumes' },
      { status: 500 }
    );
  }
}

// POST create a new resume
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
    const { title, data, templateId } = body as {
      title: string;
      data: ResumeData;
      templateId?: string;
    };

    const resume = await prisma.resume.create({
      data: {
        userId: user.id,
        title: title || 'Untitled Resume',
        data: data as any,
        templateId: templateId || null,
      },
    });

    return NextResponse.json(resume, { status: 201 });
  } catch (error) {
    console.error('Failed to create resume:', error);
    return NextResponse.json(
      { error: 'Failed to create resume' },
      { status: 500 }
    );
  }
}
