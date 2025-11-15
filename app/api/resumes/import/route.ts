import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { parseResumeFile } from '@/lib/parsers/resumeParser';
import { extractResumeDataFromText } from '@/lib/ai/resumeExtractor';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const fileType = file.type;
    let parseType: 'pdf' | 'docx';

    if (fileType === 'application/pdf') {
      parseType = 'pdf';
    } else if (
      fileType ===
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      fileType === 'application/msword'
    ) {
      parseType = 'docx';
    } else {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF or DOCX.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Parse the file to extract text
    const extractedText = await parseResumeFile(buffer, parseType);

    if (!extractedText || extractedText.trim().length === 0) {
      return NextResponse.json(
        { error: 'Could not extract text from file' },
        { status: 400 }
      );
    }

    // Use AI to extract structured resume data
    const resumeData = await extractResumeDataFromText(extractedText);

    // Return the extracted data
    return NextResponse.json({
      success: true,
      data: resumeData,
      message: 'Resume imported successfully',
    });
  } catch (error: any) {
    console.error('Resume import error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to import resume' },
      { status: 500 }
    );
  }
}
