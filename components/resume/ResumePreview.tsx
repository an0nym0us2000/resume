'use client';

import { useResumeStore } from '@/lib/store/resumeStore';
import { Card } from '@/components/ui/card';
import { getTemplate, getTemplateStyle } from '@/lib/templates/registry';

export function ResumePreview() {
  const { resumeData, templateId } = useResumeStore();

  if (!resumeData) {
    return (
      <Card className="mx-auto w-full max-w-[8.5in] bg-white p-12 shadow-xl">
        <div className="text-center text-muted-foreground">
          <p>Start editing to see your resume preview</p>
        </div>
      </Card>
    );
  }

  // Get the template component and style
  const TemplateComponent = getTemplate(templateId || 'modern');
  const templateStyle = getTemplateStyle(templateId || 'modern');

  return (
    <div className="mx-auto w-full max-w-[8.5in]">
      <TemplateComponent data={resumeData} style={templateStyle} />
    </div>
  );
}
