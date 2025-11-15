import { ResumeData } from '@/types/resume';

export interface ATSAnalysisResult {
  score: number;
  keywords: {
    matched: string[];
    missing: string[];
  };
  suggestions: string[];
  weakSections: Array<{
    section: string;
    reason: string;
    suggestion: string;
  }>;
  impactScore: {
    [section: string]: number;
  };
}

export function analyzeResume(
  resumeData: ResumeData,
  jobDescription?: string
): ATSAnalysisResult {
  let score = 0;
  const suggestions: string[] = [];
  const weakSections: ATSAnalysisResult['weakSections'] = [];
  const impactScore: ATSAnalysisResult['impactScore'] = {};

  // Extract keywords from job description
  const jobKeywords = jobDescription
    ? extractKeywords(jobDescription)
    : [];
  const resumeKeywords = extractResumeKeywords(resumeData);

  const matched = jobKeywords.filter((keyword) =>
    resumeKeywords.some((rk) => rk.toLowerCase() === keyword.toLowerCase())
  );
  const missing = jobKeywords.filter(
    (keyword) =>
      !resumeKeywords.some((rk) => rk.toLowerCase() === keyword.toLowerCase())
  );

  // Analyze contact information (10 points max)
  const contactScore = analyzeContactInfo(resumeData.personalInfo);
  score += contactScore;
  if (contactScore < 8) {
    suggestions.push('Add complete contact information (email, phone, location)');
  }

  // Analyze summary (10 points max)
  const summaryScore = analyzeSummary(resumeData.summary);
  score += summaryScore;
  impactScore.summary = summaryScore * 10;
  if (summaryScore < 7) {
    weakSections.push({
      section: 'summary',
      reason: 'Professional summary is missing or too brief',
      suggestion: 'Add a compelling 2-4 sentence summary highlighting your key skills and experience',
    });
  }

  // Analyze work experience (40 points max)
  const experienceScore = analyzeWorkExperience(resumeData.workExperience);
  score += experienceScore;
  impactScore.workExperience = experienceScore * 2.5;
  if (experienceScore < 30) {
    weakSections.push({
      section: 'workExperience',
      reason: 'Work experience lacks quantifiable achievements',
      suggestion: 'Add metrics, numbers, and specific achievements to each role',
    });
  }

  // Analyze education (15 points max)
  const educationScore = analyzeEducation(resumeData.education);
  score += educationScore;
  impactScore.education = educationScore * 6.67;
  if (educationScore < 10) {
    suggestions.push('Include complete education information with dates and location');
  }

  // Analyze skills (15 points max)
  const skillsScore = analyzeSkills(resumeData.skills);
  score += skillsScore;
  impactScore.skills = skillsScore * 6.67;
  if (skillsScore < 10) {
    weakSections.push({
      section: 'skills',
      reason: 'Skills section is incomplete or missing key technologies',
      suggestion: 'Add 10-15 relevant technical and soft skills',
    });
  }

  // Keyword matching bonus (10 points max)
  if (jobKeywords.length > 0) {
    const matchRate = matched.length / jobKeywords.length;
    const keywordBonus = Math.round(matchRate * 10);
    score += keywordBonus;

    if (matchRate < 0.5) {
      suggestions.push('Include more keywords from the job description');
    }
  }

  // ATS-friendly formatting check
  if (!hasATSFriendlyFormat(resumeData)) {
    score = Math.max(0, score - 5);
    suggestions.push('Avoid tables, images, and complex formatting for better ATS compatibility');
  }

  // General suggestions
  if (score < 70) {
    suggestions.push('Overall resume needs improvement for ATS compatibility');
  }
  if (missing.length > 0 && missing.length <= 5) {
    suggestions.push(`Add these missing keywords: ${missing.slice(0, 5).join(', ')}`);
  }

  return {
    score: Math.min(100, Math.max(0, score)),
    keywords: {
      matched,
      missing,
    },
    suggestions,
    weakSections,
    impactScore,
  };
}

function extractKeywords(text: string): string[] {
  // Simple keyword extraction - in production, use NLP library
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3);

  // Remove common words
  const stopWords = new Set([
    'the',
    'and',
    'for',
    'with',
    'this',
    'that',
    'from',
    'have',
    'will',
    'your',
    'about',
    'what',
    'which',
  ]);

  const filtered = words.filter((word) => !stopWords.has(word));

  // Get unique keywords
  const unique = [...new Set(filtered)];

  // Return top keywords (you might want to use TF-IDF here)
  return unique.slice(0, 20);
}

function extractResumeKeywords(resumeData: ResumeData): string[] {
  const keywords: string[] = [];

  // Extract from summary
  if (resumeData.summary) {
    keywords.push(...extractKeywords(resumeData.summary));
  }

  // Extract from work experience
  resumeData.workExperience?.forEach((exp) => {
    keywords.push(...extractKeywords(exp.position));
    exp.bullets?.forEach((bullet) => {
      keywords.push(...extractKeywords(bullet));
    });
  });

  // Extract from skills
  resumeData.skills?.forEach((skillCat) => {
    keywords.push(...skillCat.items);
  });

  return [...new Set(keywords)];
}

function analyzeContactInfo(personalInfo: any): number {
  let score = 0;
  if (personalInfo.fullName) score += 2;
  if (personalInfo.email) score += 3;
  if (personalInfo.phone) score += 2;
  if (personalInfo.location) score += 2;
  if (personalInfo.linkedin || personalInfo.github) score += 1;
  return score;
}

function analyzeSummary(summary?: string): number {
  if (!summary) return 0;
  const wordCount = summary.split(/\s+/).length;
  if (wordCount < 20) return 3;
  if (wordCount < 40) return 7;
  if (wordCount < 100) return 10;
  return 8; // Too long
}

function analyzeWorkExperience(workExperience: any[]): number {
  if (!workExperience || workExperience.length === 0) return 0;

  let score = 0;
  const maxScore = 40;

  // Points for having experience
  score += Math.min(15, workExperience.length * 5);

  // Points for bullet points with metrics
  let bulletScore = 0;
  workExperience.forEach((exp) => {
    exp.bullets?.forEach((bullet: string) => {
      if (hasMetrics(bullet)) bulletScore += 2;
      if (hasActionVerb(bullet)) bulletScore += 1;
    });
  });
  score += Math.min(25, bulletScore);

  return Math.min(maxScore, score);
}

function analyzeEducation(education: any[]): number {
  if (!education || education.length === 0) return 0;

  let score = 0;
  education.forEach((edu) => {
    if (edu.institution) score += 5;
    if (edu.degree) score += 5;
    if (edu.endDate) score += 2;
    if (edu.gpa) score += 3;
  });

  return Math.min(15, score);
}

function analyzeSkills(skills: any[]): number {
  if (!skills || skills.length === 0) return 0;

  const totalSkills = skills.reduce(
    (sum, cat) => sum + (cat.items?.length || 0),
    0
  );

  if (totalSkills < 5) return 5;
  if (totalSkills < 10) return 10;
  if (totalSkills < 15) return 15;
  return 15;
}

function hasATSFriendlyFormat(resumeData: ResumeData): boolean {
  // In a real implementation, check for:
  // - No tables
  // - No images
  // - No headers/footers
  // - Simple section headings
  // - Standard fonts
  return true;
}

function hasMetrics(text: string): boolean {
  // Check if text contains numbers/percentages
  return /\d+/.test(text);
}

function hasActionVerb(text: string): boolean {
  const actionVerbs = [
    'led',
    'managed',
    'developed',
    'created',
    'improved',
    'increased',
    'decreased',
    'built',
    'designed',
    'implemented',
    'launched',
    'optimized',
    'achieved',
    'delivered',
    'reduced',
    'streamlined',
  ];

  const lowerText = text.toLowerCase();
  return actionVerbs.some((verb) => lowerText.includes(verb));
}
