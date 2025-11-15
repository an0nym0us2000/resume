import OpenAI from 'openai';
import { ResumeData } from '@/types/resume';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function extractResumeDataFromText(
  text: string
): Promise<ResumeData> {
  try {
    const prompt = `You are an expert resume parser. Extract structured information from the following resume text and return it as a JSON object matching this exact TypeScript interface:

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary?: string;
  workExperience: Array<{
    id: string;
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
  }>;
  skills: Array<{
    id: string;
    category: string;
    items: string[];
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    url?: string;
    github?: string;
  }>;
}

Important instructions:
1. Generate unique IDs using crypto.randomUUID() format for each array item
2. Parse dates to a readable format like "Jan 2020" or "2020"
3. Extract all bullet points under each work experience
4. Group skills by category (e.g., "Programming Languages", "Frameworks", "Tools")
5. If information is missing, use empty strings or empty arrays
6. Set "current" to true for current positions (usually marked with "Present" or "Current")
7. Extract professional summary/objective if present
8. Extract projects with their descriptions and technologies

Resume Text:
${text}

Return ONLY valid JSON, no markdown formatting or additional text.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert resume parser that extracts structured data from resume text. Always return valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const parsedData = JSON.parse(content);

    // Validate and ensure all required fields exist
    const resumeData: ResumeData = {
      personalInfo: parsedData.personalInfo || {
        fullName: '',
        email: '',
        phone: '',
        location: '',
      },
      summary: parsedData.summary || '',
      workExperience: parsedData.workExperience || [],
      education: parsedData.education || [],
      skills: parsedData.skills || [],
      projects: parsedData.projects || [],
    };

    return resumeData;
  } catch (error) {
    console.error('AI extraction error:', error);
    throw new Error('Failed to extract resume data using AI');
  }
}
