'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PersonalInfoEditor } from './sections/PersonalInfoEditor';
import { SummaryEditor } from './sections/SummaryEditor';
import { WorkExperienceEditor } from './sections/WorkExperienceEditorDnD';
import { EducationEditor } from './sections/EducationEditor';
import { SkillsEditor } from './sections/SkillsEditor';
import { ProjectsEditor } from './sections/ProjectsEditor';
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Code,
  Award,
  Languages,
  Plus,
} from 'lucide-react';

export function ResumeEditor() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="text-xs">
            <User className="mr-1 h-3 w-3" />
            Personal
          </TabsTrigger>
          <TabsTrigger value="summary" className="text-xs">
            <FileText className="mr-1 h-3 w-3" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="experience" className="text-xs">
            <Briefcase className="mr-1 h-3 w-3" />
            Experience
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs">
            <GraduationCap className="mr-1 h-3 w-3" />
            Education
          </TabsTrigger>
          <TabsTrigger value="skills" className="text-xs">
            <Lightbulb className="mr-1 h-3 w-3" />
            Skills
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-6">
          <PersonalInfoEditor />
        </TabsContent>

        <TabsContent value="summary" className="mt-6">
          <SummaryEditor />
        </TabsContent>

        <TabsContent value="experience" className="mt-6">
          <WorkExperienceEditor />
        </TabsContent>

        <TabsContent value="education" className="mt-6">
          <EducationEditor />
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <SkillsEditor />
        </TabsContent>
      </Tabs>

      {/* Additional Sections */}
      <div className="mt-8 space-y-4">
        <h3 className="text-sm font-semibold text-gray-700">Optional Sections</h3>
        <div className="space-y-2">
          <ProjectsEditor />
        </div>
      </div>
    </div>
  );
}
