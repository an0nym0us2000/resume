'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/lib/store/resumeStore';
import { Education } from '@/types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';

export function EducationEditor() {
  const { resumeData, updateSection } = useResumeStore();
  const education = resumeData?.education || [];

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: [],
      relevant: [],
    };
    updateSection('education', [...education, newEducation]);
  };

  const removeEducation = (id: string) => {
    updateSection(
      'education',
      education.filter((edu) => edu.id !== id)
    );
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    updateSection(
      'education',
      education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button onClick={addEducation} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="mb-4 text-muted-foreground">No education added yet</p>
          <Button onClick={addEducation}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your Education
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={edu.id} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-5 w-5 cursor-move text-gray-400" />
                  <h3 className="font-semibold">Education {index + 1}</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Institution *</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                    placeholder="University Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Degree *</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field || ''}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={edu.location || ''}
                    onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                    placeholder="Boston, MA"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate || ''}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>GPA (optional)</Label>
                  <Input
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
