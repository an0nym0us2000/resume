'use client';

import { Button } from '@/components/ui/button';
import { Sparkles, Wand2, FileText, Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function Toolbar() {
  const [jobDescription, setJobDescription] = useState('');

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Sparkles className="mr-2 h-4 w-4" />
              AI Generate Resume
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Resume with AI</DialogTitle>
              <DialogDescription>
                Paste a job description and we'll generate a tailored resume for you.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Paste the job description here..."
                  className="mt-2 min-h-[200px]"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
              </div>
              <Button className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Resume
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Import Resume
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Import Existing Resume</DialogTitle>
              <DialogDescription>
                Upload your existing resume (PDF or DOCX) and we'll parse it for you.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12">
                <div className="text-center">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop or click to upload
                  </p>
                  <Button variant="outline" className="mt-4">
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="outline" size="sm">
          <Wand2 className="mr-2 h-4 w-4" />
          AI Optimize
        </Button>
      </div>
    </div>
  );
}
