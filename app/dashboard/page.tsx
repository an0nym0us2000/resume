import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Plus, FileText, Download, Trash2, Copy, MoreVertical } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // In a real app, fetch resumes from database
  // For now, we'll use mock data
  const resumes = [
    {
      id: '1',
      title: 'Software Engineer Resume',
      updatedAt: new Date('2024-01-15'),
      atsScore: 85,
      templateName: 'Modern Professional',
    },
    {
      id: '2',
      title: 'Product Manager Resume',
      updatedAt: new Date('2024-01-10'),
      atsScore: 72,
      templateName: 'Classic',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <div className="container px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Resumes</h1>
            <p className="mt-2 text-muted-foreground">
              Manage and create professional resumes
            </p>
          </div>
          <Button asChild className="gap-2">
            <Link href="/builder/new">
              <Plus className="h-4 w-4" />
              New Resume
            </Link>
          </Button>
        </div>

        {resumes.length === 0 ? (
          <Card className="glass-card p-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="mb-2 text-xl font-semibold">No resumes yet</h2>
            <p className="mb-6 text-muted-foreground">
              Create your first resume to get started
            </p>
            <Button asChild>
              <Link href="/builder/new">
                <Plus className="mr-2 h-4 w-4" />
                Create Resume
              </Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => (
              <Card key={resume.id} className="glass-card overflow-hidden">
                <div className="aspect-[8.5/11] border-b bg-white p-6">
                  {/* Resume preview thumbnail would go here */}
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    <FileText className="h-16 w-16" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="mb-1 font-semibold">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {resume.templateName}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant={resume.atsScore >= 80 ? 'default' : 'secondary'}>
                      ATS Score: {resume.atsScore}%
                    </Badge>
                  </div>

                  <div className="mb-4 text-sm text-muted-foreground">
                    Updated {resume.updatedAt.toLocaleDateString()}
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/builder/${resume.id}`}>Edit Resume</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
