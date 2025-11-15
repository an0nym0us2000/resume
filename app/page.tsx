import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import {
  FileText,
  Sparkles,
  Zap,
  CheckCircle,
  ArrowRight,
  BarChart3,
  Wand2,
  Download,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="container px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-secondary/50 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Builder
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            Create Your Perfect Resume in Minutes
          </h1>
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Build professional, ATS-friendly resumes with AI-powered suggestions.
            Stand out from the crowd and land your dream job.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="gap-2">
              <Link href={user ? '/dashboard' : '/auth/signup'}>
                {user ? 'Go to Dashboard' : 'Get Started Free'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/templates">View Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-y bg-secondary/20 py-20">
        <div className="container px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to help you create the perfect resume
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="glass-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">AI-Powered Writing</h3>
              <p className="text-muted-foreground">
                Generate professional bullet points and summaries with AI. Rewrite content
                to match your industry and tone.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">ATS Optimization</h3>
              <p className="text-muted-foreground">
                Get your ATS score, keyword analysis, and suggestions to improve your
                resume for applicant tracking systems.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">10+ Templates</h3>
              <p className="text-muted-foreground">
                Choose from professionally designed templates. All optimized for ATS and
                easy to customize.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Real-Time Preview</h3>
              <p className="text-muted-foreground">
                See your changes instantly with live preview. Edit and preview side by
                side for the best experience.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Export as PDF</h3>
              <p className="text-muted-foreground">
                Download your resume as a high-quality PDF. Perfect formatting guaranteed
                for every template.
              </p>
            </Card>

            <Card className="glass-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Auto-Save</h3>
              <p className="text-muted-foreground">
                Never lose your work. Your resume is automatically saved as you type with
                full version history.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4">
          <Card className="glass-card mx-auto max-w-4xl p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Ready to Build Your Resume?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Join thousands of job seekers who have created professional resumes with our
              AI-powered platform.
            </p>
            <Button size="lg" asChild className="gap-2">
              <Link href={user ? '/dashboard' : '/auth/signup'}>
                {user ? 'Create Resume' : 'Get Started Now'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AI Resume Maker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
