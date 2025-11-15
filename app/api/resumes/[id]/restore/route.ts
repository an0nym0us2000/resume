import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

// POST restore a version
export async function POST(
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
    const { versionId } = body;

    if (!versionId) {
      return NextResponse.json(
        { error: 'Version ID is required' },
        { status: 400 }
      );
    }

    // Verify ownership
    const resume = await prisma.resume.findFirst({
      where: {
        id: params.id,
        userId: user.id,
      },
    });

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Get the version to restore
    const version = await prisma.resumeVersion.findFirst({
      where: {
        id: versionId,
        resumeId: params.id,
      },
    });

    if (!version) {
      return NextResponse.json({ error: 'Version not found' }, { status: 404 });
    }

    // Create a new version with current data before restoring
    await prisma.resumeVersion.create({
      data: {
        resumeId: params.id,
        data: resume.data as never,
        version: resume.version,
        changeNote: 'Before restore',
      },
    });

    // Restore the version
    const updatedResume = await prisma.resume.update({
      where: {
        id: params.id,
      },
      data: {
        data: version.data as never,
        version: resume.version + 1,
        lastAccessedAt: new Date(),
      },
    });

    return NextResponse.json(updatedResume);
  } catch (error) {
    console.error('Failed to restore version:', error);
    return NextResponse.json(
      { error: 'Failed to restore version' },
      { status: 500 }
    );
  }
}
