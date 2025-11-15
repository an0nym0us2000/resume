'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useResumeStore } from '@/lib/store/resumeStore';
import { cn } from '@/lib/utils';

interface ResumeImportProps {
  trigger?: React.ReactNode;
}

export function ResumeImport({ trigger }: ResumeImportProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { toast } = useToast();
  const router = useRouter();
  const { setResumeData } = useResumeStore();

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    setUploadStatus('uploading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/resumes/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to import resume');
      }

      const result = await response.json();

      // Update resume store with imported data
      setResumeData(result.data);

      setUploadStatus('success');
      toast({
        title: 'Success',
        description: 'Resume imported successfully! Redirecting to builder...',
      });

      // Redirect to builder after a short delay
      setTimeout(() => {
        setIsOpen(false);
        router.push('/builder/new');
      }, 1500);
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setErrorMessage(error.message || 'Failed to import resume');
      toast({
        title: 'Error',
        description: error.message || 'Failed to import resume',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        const validTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
        ];

        if (validTypes.includes(file.type)) {
          handleFileUpload(file);
        } else {
          toast({
            title: 'Invalid file type',
            description: 'Please upload a PDF or DOCX file',
            variant: 'destructive',
          });
        }
      }
    },
    [toast]
  );

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Resume
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Resume</DialogTitle>
          <DialogDescription>
            Upload your existing resume in PDF or DOCX format. Our AI will
            extract and structure your information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors',
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-gray-300 hover:border-gray-400',
              uploadStatus === 'uploading' && 'pointer-events-none opacity-50'
            )}
          >
            {uploadStatus === 'idle' && (
              <>
                <FileText className="mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-sm font-medium text-gray-700">
                  Drag and drop your resume here
                </p>
                <p className="mb-4 text-xs text-gray-500">
                  or click to browse (PDF or DOCX, max 10MB)
                </p>
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                  onChange={handleFileInput}
                  disabled={isUploading}
                />
                <Button asChild variant="secondary" size="sm">
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    Choose File
                  </label>
                </Button>
              </>
            )}

            {uploadStatus === 'uploading' && (
              <div className="flex flex-col items-center">
                <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
                <p className="text-sm font-medium text-gray-700">
                  Importing your resume...
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  This may take a few moments
                </p>
              </div>
            )}

            {uploadStatus === 'success' && (
              <div className="flex flex-col items-center">
                <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
                <p className="text-sm font-medium text-gray-700">
                  Import successful!
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Redirecting to builder...
                </p>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="flex flex-col items-center">
                <XCircle className="mb-4 h-12 w-12 text-red-500" />
                <p className="text-sm font-medium text-red-700">Import failed</p>
                <p className="mt-1 text-xs text-gray-500">{errorMessage}</p>
                <Button
                  onClick={() => setUploadStatus('idle')}
                  variant="outline"
                  size="sm"
                  className="mt-4"
                >
                  Try Again
                </Button>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="rounded-md bg-blue-50 p-3">
            <p className="text-xs text-blue-900">
              <strong>Note:</strong> AI parsing works best with well-formatted
              resumes. You may need to review and adjust the imported data.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
