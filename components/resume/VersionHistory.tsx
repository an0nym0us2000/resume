'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Clock, RotateCcw, FileText, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Version {
  id: string;
  version: number;
  changeNote?: string;
  createdAt: string;
  data: any;
}

interface VersionHistoryProps {
  resumeId: string;
  onRestore?: () => void;
}

export function VersionHistory({ resumeId, onRestore }: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRestoring, setIsRestoring] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<Version | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadVersions();
  }, [resumeId]);

  const loadVersions = async () => {
    try {
      const response = await fetch(`/api/resumes/${resumeId}/versions`);
      if (response.ok) {
        const data = await response.json();
        setVersions(data);
      }
    } catch (error) {
      console.error('Failed to load versions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load version history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (versionId: string) => {
    setIsRestoring(true);
    try {
      const response = await fetch(`/api/resumes/${resumeId}/restore`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ versionId }),
      });

      if (!response.ok) throw new Error('Failed to restore');

      toast({
        title: 'Success',
        description: 'Version restored successfully',
      });

      setSelectedVersion(null);
      onRestore?.();

      // Reload the page to show restored version
      window.location.reload();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to restore version',
        variant: 'destructive',
      });
    } finally {
      setIsRestoring(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (versions.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
        <h3 className="mb-2 font-semibold">No Version History</h3>
        <p className="text-sm text-muted-foreground">
          Version history will appear here as you make changes to your resume.
        </p>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Version History</h3>
          <Badge variant="outline">{versions.length} versions</Badge>
        </div>

        <div className="space-y-3">
          {versions.map((version) => (
            <Card key={version.id} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Version {version.version}</span>
                    {version.changeNote && (
                      <Badge variant="secondary" className="text-xs">
                        {version.changeNote}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(version.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedVersion(version)}
                  >
                    <RotateCcw className="mr-2 h-3 w-3" />
                    Restore
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Restore Confirmation Dialog */}
      <Dialog open={!!selectedVersion} onOpenChange={() => setSelectedVersion(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restore Version {selectedVersion?.version}?</DialogTitle>
            <DialogDescription>
              This will restore your resume to this version. Your current version will be
              saved in history before restoring.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedVersion && (
              <Card className="p-4 bg-muted/50">
                <p className="text-sm">
                  <strong>Saved:</strong>{' '}
                  {formatDistanceToNow(new Date(selectedVersion.createdAt), {
                    addSuffix: true,
                  })}
                </p>
                {selectedVersion.changeNote && (
                  <p className="mt-1 text-sm">
                    <strong>Note:</strong> {selectedVersion.changeNote}
                  </p>
                )}
              </Card>
            )}

            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setSelectedVersion(null)}
                disabled={isRestoring}
              >
                Cancel
              </Button>
              <Button
                onClick={() => selectedVersion && handleRestore(selectedVersion.id)}
                disabled={isRestoring}
              >
                {isRestoring && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Restore Version
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
