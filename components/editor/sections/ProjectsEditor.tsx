'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useResumeStore } from '@/lib/store/resumeStore';
import { Project } from '@/types/resume';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

export function ProjectsEditor() {
  const { resumeData, updateSection } = useResumeStore();
  const projects = resumeData?.projects || [];
  const [isExpanded, setIsExpanded] = useState(projects.length > 0);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
      bullets: [],
    };
    updateSection('projects', [...projects, newProject]);
    setIsExpanded(true);
  };

  const removeProject = (id: string) => {
    updateSection(
      'projects',
      projects.filter((proj) => proj.id !== id)
    );
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    updateSection(
      'projects',
      projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj))
    );
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Projects</h3>
            {projects.length > 0 && (
              <span className="text-sm text-muted-foreground">({projects.length})</span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {isExpanded && (
          <>
            <Separator className="my-4" />
            <div className="space-y-4">
              {projects.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="mb-4 text-sm text-muted-foreground">
                    Showcase your personal or professional projects
                  </p>
                  <Button onClick={addProject} size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <Card key={project.id} className="p-4">
                        <div className="mb-4 flex items-center justify-between">
                          <h4 className="text-sm font-semibold">Project {index + 1}</h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(project.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label className="text-xs">Project Name *</Label>
                              <Input
                                value={project.name}
                                onChange={(e) =>
                                  updateProject(project.id, 'name', e.target.value)
                                }
                                placeholder="E-commerce Platform"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Technologies</Label>
                              <Input
                                value={project.technologies?.join(', ') || ''}
                                onChange={(e) =>
                                  updateProject(
                                    project.id,
                                    'technologies',
                                    e.target.value.split(',').map((t) => t.trim())
                                  )
                                }
                                placeholder="React, Node.js, MongoDB"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">Project URL</Label>
                              <Input
                                value={project.url || ''}
                                onChange={(e) =>
                                  updateProject(project.id, 'url', e.target.value)
                                }
                                placeholder="https://example.com"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs">GitHub URL</Label>
                              <Input
                                value={project.github || ''}
                                onChange={(e) =>
                                  updateProject(project.id, 'github', e.target.value)
                                }
                                placeholder="https://github.com/..."
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs">Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) =>
                                updateProject(project.id, 'description', e.target.value)
                              }
                              placeholder="Brief description of your project..."
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button onClick={addProject} variant="outline" size="sm" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Project
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
