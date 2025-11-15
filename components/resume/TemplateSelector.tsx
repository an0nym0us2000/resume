'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LayoutTemplate, Check } from 'lucide-react';
import { useResumeStore } from '@/lib/store/resumeStore';
import { getAllTemplates } from '@/lib/templates/registry';
import { useToast } from '@/hooks/use-toast';

export function TemplateSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { templateId, setTemplateId } = useResumeStore();
  const { toast } = useToast();
  const templates = getAllTemplates();

  const handleSelectTemplate = (id: string) => {
    setTemplateId(id);
    toast({
      title: 'Template changed',
      description: `Switched to ${templates.find((t) => t.id === id)?.name}`,
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <LayoutTemplate className="mr-2 h-4 w-4" />
          Change Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose a Template</DialogTitle>
          <DialogDescription>
            Select a professional template for your resume
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer overflow-hidden transition-all hover:shadow-lg ${
                templateId === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleSelectTemplate(template.id)}
            >
              {/* Template Preview */}
              <div
                className="relative aspect-[8.5/11] border-b p-4"
                style={{ backgroundColor: template.colors.background }}
              >
                {/* Simple preview representation */}
                <div className="space-y-2">
                  <div
                    className="h-6 w-3/4 rounded"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div
                    className="h-2 w-1/2 rounded"
                    style={{ backgroundColor: template.colors.secondary }}
                  />
                  <div className="mt-4 space-y-1">
                    <div
                      className="h-2 w-full rounded"
                      style={{ backgroundColor: template.colors.text + '40' }}
                    />
                    <div
                      className="h-2 w-5/6 rounded"
                      style={{ backgroundColor: template.colors.text + '40' }}
                    />
                  </div>
                </div>

                {/* Selected indicator */}
                {templateId === template.id && (
                  <div className="absolute right-2 top-2 rounded-full bg-blue-500 p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-semibold">{template.name}</h3>
                  {template.isPremium && (
                    <Badge variant="default">Premium</Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600">{template.description}</p>

                <div className="mt-3 flex gap-2">
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: template.colors.primary }}
                    title="Primary color"
                  />
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: template.colors.secondary }}
                    title="Secondary color"
                  />
                  <div
                    className="h-6 w-6 rounded-full border"
                    style={{ backgroundColor: template.colors.accent }}
                    title="Accent color"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
