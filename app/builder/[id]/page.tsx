'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ResumeEditor } from '@/components/editor/ResumeEditor';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Toolbar } from '@/components/editor/Toolbar';
import {
  Download,
  Eye,
  EyeOff,
  Save,
  LayoutTemplate,
  BarChart3,
  Check,
  Loader2,
} from 'lucide-react';
import { useResumeStore } from '@/lib/store/resumeStore';
import { useToast } from '@/hooks/use-toast';
import { useAutoSave } from '@/lib/hooks/useAutoSave';
import { Badge } from '@/components/ui/badge';

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();
  const { resumeData, setResumeData } = useResumeStore();

  useEffect(() => {
    const loadResume = async () => {
      if (params.id && params.id !== 'new') {
        try {
          const response = await fetch(`/api/resumes/${params.id}`);
          if (!response.ok) throw new Error('Failed to load resume');

          const resume = await response.json();
          setResumeData(resume.data);
          setResumeId(resume.id);
          setLastSaved(new Date(resume.updatedAt));
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to load resume',
            variant: 'destructive',
          });
        }
      }
      setIsLoading(false);
    };

    loadResume();
  }, [params.id, toast, setResumeData]);

  // Auto-save functionality
  const saveResume = async (data: typeof resumeData) => {
    setIsSaving(true);
    try {
      if (resumeId) {
        // Update existing resume
        const response = await fetch(`/api/resumes/${resumeId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data }),
        });

        if (!response.ok) throw new Error('Failed to save');

        setLastSaved(new Date());
      } else {
        // Create new resume
        const response = await fetch('/api/resumes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Untitled Resume',
            data,
          }),
        });

        if (!response.ok) throw new Error('Failed to create');

        const newResume = await response.json();
        setResumeId(newResume.id);
        setLastSaved(new Date());

        // Update URL without reload
        router.replace(`/builder/${newResume.id}`);
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
      toast({
        title: 'Auto-save failed',
        description: 'Your changes may not be saved',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Use auto-save hook
  useAutoSave({
    data: resumeData,
    onSave: saveResume,
    delay: 2000,
    enabled: !isLoading,
  });

  const handleManualSave = async () => {
    await saveResume(resumeData);
    toast({
      title: 'Saved',
      description: 'Your resume has been saved',
    });
  };

  const handleExport = async () => {
    try {
      toast({
        title: 'Exporting',
        description: 'Generating PDF...',
      });

      // TODO: Implement actual PDF export
      const response = await fetch(`/api/resumes/${resumeId}/export`, {
        method: 'POST',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export resume',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="mt-4 text-muted-foreground">Loading resume...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">Resume Builder</h1>
            {isSaving ? (
              <Badge variant="outline" className="gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Saving...
              </Badge>
            ) : lastSaved ? (
              <Badge variant="outline" className="gap-1">
                <Check className="h-3 w-3" />
                Saved {new Date(lastSaved).toLocaleTimeString()}
              </Badge>
            ) : (
              <Badge variant="outline">Auto-save enabled</Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <LayoutTemplate className="mr-2 h-4 w-4" />
              Template
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              ATS Score
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={handleManualSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Editor Panel */}
        <div
          className={`${
            showPreview ? 'w-1/2' : 'w-full'
          } overflow-y-auto border-r bg-gray-50 transition-all`}
        >
          <div className="p-6">
            <Toolbar />
            <ResumeEditor />
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="w-1/2 overflow-y-auto bg-gray-100 p-6">
            <ResumePreview />
          </div>
        )}
      </div>
    </div>
  );
}
