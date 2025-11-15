import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import { ResumeData } from '@/types/resume';

// GET single resume
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
      include: {
        template: true,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    return NextResponse.json(resume);
  } catch (error) {
    console.error('Failed to fetch resume:', error);
    return NextResponse.json(
      { error: 'Failed to fetch resume' },
      { status: 500 }
    );
  }
}

// PATCH update resume
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, data, templateId, atsScore } = body as {
      title?: string;
      data?: ResumeData;
      templateId?: string;
      atsScore?: number;
    };

    // Verify ownership
    const existingResume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Create version snapshot before updating
    await prisma.resumeVersion.create({
      data: {
        resumeId: params.id,
        data: existingResume.data as never,
        version: existingResume.version,
        changeNote: 'Auto-saved version',
      },
    });

    // Update resume
    const updatedResume = await prisma.resume.update({
      where: {
        id: params.id,
      },
      data: {
        ...(title && { title }),
        ...(data && { data: data as any }),
        ...(templateId !== undefined && { templateId }),
        ...(atsScore !== undefined && { atsScore, lastAtsCheck: new Date() }),
        version: existingResume.version + 1,
        lastAccessedAt: new Date(),
      },
    });

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Failed to update resume:', error);
    return NextResponse.json(
      { error: 'Failed to update resume' },
      { status: 500 }
    );
  }
}

// DELETE resume
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify ownership
    const existingResume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!existingResume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Soft delete
    await prisma.resume.update({
      where: {
        id: params.id,
      },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete resume:', error);
    return NextResponse.json(
      { error: 'Failed to delete resume' },
      { status: 500 }
    );
  }
}
