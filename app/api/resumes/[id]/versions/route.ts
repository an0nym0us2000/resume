import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';

// GET version history for a resume
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

    // Get all versions
    const versions = await prisma.resumeVersion.findMany({
      where: {
        resumeId: params.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20, // Last 20 versions
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.error('Failed to fetch versions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}
