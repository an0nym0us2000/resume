import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Badge } from '@/components/ui/badge';
import { createClient } from '@/lib/supabase/server';
import { Check, Crown } from 'lucide-react';

export default async function TemplatesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const templates = [
    {
      id: '1',
      name: 'Modern Professional',
      description: 'Clean and contemporary design perfect for tech and creative roles',
      category: 'Professional',
      thumbnail: '/templates/modern-professional.png',
      isAtsOptimized: true,
      isPremium: false,
      features: ['ATS-Friendly', 'Single Column', 'Bold Headers'],
    },
    {
      id: '2',
      name: 'Classic Executive',
      description: 'Traditional layout ideal for corporate and executive positions',
      category: 'Classic',
      thumbnail: '/templates/classic-executive.png',
      isAtsOptimized: true,
      isPremium: false,
      features: ['ATS-Friendly', 'Two Column', 'Professional'],
    },
    {
      id: '3',
      name: 'Minimal Clean',
      description: 'Minimalist design with maximum impact and readability',
      category: 'Minimal',
      thumbnail: '/templates/minimal-clean.png',
      isAtsOptimized: true,
      isPremium: false,
      features: ['ATS-Friendly', 'Single Column', 'Minimal'],
    },
    {
      id: '4',
      name: 'Tech Modern',
      description: 'Contemporary layout optimized for software engineering roles',
      category: 'Tech',
      thumbnail: '/templates/tech-modern.png',
      isAtsOptimized: true,
      isPremium: true,
      features: ['ATS-Friendly', 'Projects Section', 'GitHub Links'],
    },
    {
      id: '5',
      name: 'Creative Bold',
      description: 'Eye-catching design for creative professionals and designers',
      category: 'Creative',
      thumbnail: '/templates/creative-bold.png',
      isAtsOptimized: true,
      isPremium: true,
      features: ['ATS-Friendly', 'Color Accents', 'Portfolio Ready'],
    },
    {
      id: '6',
      name: 'Academic Scholar',
      description: 'Ideal for academic, research, and education positions',
      category: 'Academic',
      thumbnail: '/templates/academic-scholar.png',
      isAtsOptimized: true,
      isPremium: true,
      features: ['ATS-Friendly', 'Publications', 'Research Focus'],
    },
    {
      id: '7',
      name: 'Sales Pro',
      description: 'Achievement-focused layout for sales and business development',
      category: 'Sales',
      thumbnail: '/templates/sales-pro.png',
      isAtsOptimized: true,
      isPremium: false,
      features: ['ATS-Friendly', 'Metrics Focus', 'Bold Achievements'],
    },
    {
      id: '8',
      name: 'International',
      description: 'Europass-style format for international opportunities',
      category: 'International',
      thumbnail: '/templates/international.png',
      isAtsOptimized: true,
      isPremium: true,
      features: ['ATS-Friendly', 'Language Support', 'International'],
    },
    {
      id: '9',
      name: 'Compact Efficient',
      description: 'Maximize content in minimal space without compromising readability',
      category: 'Compact',
      thumbnail: '/templates/compact-efficient.png',
      isAtsOptimized: true,
      isPremium: false,
      features: ['ATS-Friendly', 'Space Efficient', 'Dense Content'],
    },
    {
      id: '10',
      name: 'Senior Executive',
      description: 'Premium template for C-level and senior management positions',
      category: 'Executive',
      thumbnail: '/templates/senior-executive.png',
      isAtsOptimized: true,
      isPremium: true,
      features: ['ATS-Friendly', 'Executive Summary', 'Board Ready'],
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <section className="container px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold">Resume Templates</h1>
          <p className="text-lg text-muted-foreground">
            Choose from 10+ professionally designed, ATS-optimized templates
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden">
              {/* Template Preview */}
              <div className="aspect-[8.5/11] border-b bg-gray-100 p-6">
                <div className="flex h-full items-center justify-center bg-white shadow-lg">
                  <p className="text-sm text-muted-foreground">{template.name}</p>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    <Badge variant="outline" className="mt-1">
                      {template.category}
                    </Badge>
                  </div>
                  {template.isPremium && (
                    <Badge className="gap-1">
                      <Crown className="h-3 w-3" />
                      Pro
                    </Badge>
                  )}
                </div>

                <p className="mb-4 text-sm text-muted-foreground">
                  {template.description}
                </p>

                <div className="mb-4 space-y-1">
                  {template.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-3 w-3 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/builder/new?template=${template.id}`}>
                    Use This Template
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {!user && (
          <div className="mt-12 text-center">
            <Card className="glass-card mx-auto max-w-2xl p-8">
              <h2 className="mb-4 text-2xl font-bold">Ready to Get Started?</h2>
              <p className="mb-6 text-muted-foreground">
                Sign up now to access all templates and create your professional resume
              </p>
              <Button asChild size="lg">
                <Link href="/auth/signup">Create Free Account</Link>
              </Button>
            </Card>
          </div>
        )}
      </section>
    </div>
  );
}
