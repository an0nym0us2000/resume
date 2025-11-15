'use client';

import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useResumeStore } from '@/lib/store/resumeStore';
import { Sparkles, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export function SummaryEditor() {
  const { resumeData, updateSection } = useResumeStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const summary = resumeData?.summary || '';

  const handleChange = (value: string) => {
    updateSection('summary', value);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // TODO: Call AI API to generate summary
      const generated = 'Experienced professional with a proven track record...';
      handleChange(generated);
    } catch (error) {
      console.error('Failed to generate summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRewrite = async (tone: string) => {
    setIsGenerating(true);
    try {
      // TODO: Call AI API to rewrite with specific tone
    } catch (error) {
      console.error('Failed to rewrite summary:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Professional Summary</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI Generate
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={summary}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Write a compelling summary that highlights your key skills, experience, and career goals..."
            className="min-h-[150px]"
          />
          <p className="text-xs text-muted-foreground">
            {summary.length} / 500 characters
          </p>
        </div>

        {summary && (
          <div className="space-y-2">
            <Label>AI Rewrite Options</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRewrite('professional')}
                disabled={isGenerating}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Professional
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRewrite('confident')}
                disabled={isGenerating}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Confident
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRewrite('simple')}
                disabled={isGenerating}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Simple
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRewrite('grammar')}
                disabled={isGenerating}
              >
                <RefreshCw className="mr-2 h-3 w-3" />
                Fix Grammar
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
