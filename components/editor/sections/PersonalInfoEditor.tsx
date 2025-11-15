'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResumeStore } from '@/lib/store/resumeStore';
import { PersonalInfo } from '@/types/resume';

export function PersonalInfoEditor() {
  const { resumeData, updateSection } = useResumeStore();
  const personalInfo = resumeData?.personalInfo || {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
    portfolio: '',
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    updateSection('personalInfo', {
      ...personalInfo,
      [field]: value,
    });
  };

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-semibold">Personal Information</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={personalInfo.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={personalInfo.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={personalInfo.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={personalInfo.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/johndoe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={personalInfo.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="johndoe.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input
            id="portfolio"
            value={personalInfo.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="portfolio.johndoe.com"
          />
        </div>
      </div>
    </Card>
  );
}
