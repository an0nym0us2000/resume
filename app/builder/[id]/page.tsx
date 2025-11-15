'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResumeEditor } from '@/components/editor/ResumeEditor';
import { ResumePreview } from '@/components/resume/ResumePreview';
import { Toolbar } from '@/components/editor/Toolbar';
import {
  Download,
  Eye,
  EyeOff,
  Save,
  Sparkles,
  LayoutTemplate,
  BarChart3,
} from 'lucide-react';
import { useResumeStore } from '@/lib/store/resumeStore';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function BuilderPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const { toast } = useToast();
  const { resumeData, isPreviewMode, togglePreviewMode } = useResumeStore();

  useEffect(() => {
    // Load resume data if editing existing resume
    const loadResume = async () => {
      if (params.id && params.id !== 'new') {
        try {
          // TODO: Fetch resume from API
          // const response = await fetch(`/api/resumes/${params.id}`);
          // const data = await response.json();
          // useResumeStore.getState().setResumeData(data);
          setIsLoading(false);
        } catch (error) {
          toast({
            title: 'Error',
            description: 'Failed to load resume',
            variant: 'destructive',
          });
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadResume();
  }, [params.id, toast]);

  const handleSave = async () => {
    try {
      toast({
        title: 'Saved',
        description: 'Your resume has been saved',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save resume',
        variant: 'destructive',
      });
    }
  };

  const handleExport = async () => {
    try {
      toast({
        title: 'Exporting',
        description: 'Generating PDF...',
      });
      // TODO: Implement PDF export
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
            <Badge variant="outline">Auto-saving</Badge>
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
            <Button variant="outline" size="sm" onClick={handleSave}>
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
