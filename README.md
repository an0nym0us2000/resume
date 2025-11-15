# AI Resume Maker

A modern, AI-powered resume builder platform built with Next.js 14, TypeScript, and Tailwind CSS. Create professional, ATS-optimized resumes with real-time preview, AI-powered content generation, and advanced analytics.

## Features

### Core Features
- **AI-Powered Writing**: Generate professional bullet points, summaries, and content with OpenAI/Claude
- **ATS Optimization**: Real-time ATS score, keyword analysis, and improvement suggestions
- **Real-Time Preview**: Split-screen editor with live preview
- **10+ Templates**: Professional, ATS-friendly templates with one-click switching
- **Auto-Save**: Automatic saving with full version history
- **PDF Export**: High-quality PDF generation
- **Drag & Drop**: Reorder resume sections easily
- **Job Description Analysis**: Optimize resume for specific job postings

### AI Features
- Generate complete resume from scratch
- Rewrite bullet points for different industries
- Grammar and clarity fixes
- Tone adjustment (formal, confident, simple)
- Keyword optimization
- Impact score analysis

### ATS Features
- ATS compatibility score
- Keyword matching and suggestions
- Missing keyword detection
- Section strength analysis
- Job description comparison
- Multi-resume comparison

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN UI
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4 / Anthropic Claude
- **Payments**: Stripe
- **PDF Generation**: @react-pdf/renderer
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Drag & Drop**: @dnd-kit

## Project Structure

```
├── app/                      # Next.js app router pages
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # User dashboard
│   ├── builder/              # Resume builder
│   ├── templates/            # Template gallery
│   ├── pricing/              # Pricing page
│   ├── settings/             # User settings
│   ├── admin/                # Admin dashboard
│   └── api/                  # API routes
│       ├── ai/               # AI endpoints
│       ├── ats/              # ATS analysis
│       ├── resumes/          # Resume CRUD
│       └── stripe/           # Payment webhooks
├── components/
│   ├── ui/                   # ShadCN UI components
│   ├── layout/               # Layout components
│   ├── resume/               # Resume display components
│   ├── editor/               # Editor components
│   ├── templates/            # Template components
│   ├── ats/                  # ATS analysis components
│   └── ai/                   # AI feature components
├── lib/
│   ├── ai/                   # AI client and utilities
│   ├── ats/                  # ATS scoring logic
│   ├── utils/                # Utility functions
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand stores
│   ├── supabase/             # Supabase clients
│   └── prisma.ts             # Prisma client
├── types/                    # TypeScript type definitions
├── prisma/
│   └── schema.prisma         # Database schema
└── public/
    ├── templates/            # Template assets
    └── images/               # Static images
```

## Database Schema

### Core Models
- **User**: User accounts with subscription info
- **Resume**: Resume data stored as JSON with metadata
- **ResumeVersion**: Version history for each resume
- **Template**: Resume templates with layout and styling
- **AtsAnalysis**: ATS analysis results and suggestions
- **Payment**: Payment transactions
- **AiPrompt**: Customizable AI prompts
- **BulletPreset**: Industry-specific bullet point presets
- **AiUsage**: AI API usage tracking

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI (choose one or both)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID_MONTHLY=
STRIPE_PRICE_ID_YEARLY=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
ADMIN_EMAIL=admin@yourapp.com
```

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Supabase account
- OpenAI or Anthropic API key
- Stripe account (for payments)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd resume
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

5. Seed the database (optional)
```bash
npx prisma db seed
```

6. Run the development server
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## API Routes

### AI Endpoints

#### POST `/api/ai/generate`
Generate AI content for resume sections

**Request:**
```json
{
  "type": "bullet_points" | "summary" | "full_resume",
  "context": {
    "role": "Software Engineer",
    "company": "Tech Corp",
    "responsibilities": ["..."]
  },
  "options": {
    "tone": "professional" | "confident" | "simple",
    "length": "short" | "medium" | "long"
  }
}
```

**Response:**
```json
{
  "content": "Generated content...",
  "tokens": 150
}
```

#### POST `/api/ai/rewrite`
Rewrite existing content

**Request:**
```json
{
  "text": "Original text",
  "type": "grammar" | "tone" | "industry",
  "options": {
    "tone": "professional",
    "industry": "tech"
  }
}
```

### ATS Endpoints

#### POST `/api/ats/analyze`
Analyze resume for ATS compatibility

**Request:**
```json
{
  "resumeId": "uuid",
  "jobDescription": "Optional job posting text"
}
```

**Response:**
```json
{
  "score": 85,
  "keywords": {
    "matched": ["React", "TypeScript"],
    "missing": ["AWS", "Docker"]
  },
  "suggestions": ["Add more technical keywords", "..."],
  "weakSections": [{
    "section": "work_experience",
    "reason": "Lacks quantifiable achievements",
    "suggestion": "Add metrics and numbers"
  }]
}
```

### Resume Endpoints

#### GET `/api/resumes`
Get all user resumes

#### POST `/api/resumes`
Create new resume

#### GET `/api/resumes/[id]`
Get single resume

#### PATCH `/api/resumes/[id]`
Update resume

#### DELETE `/api/resumes/[id]`
Delete resume

#### POST `/api/resumes/[id]/export`
Export resume as PDF

## Development

### Code Style
- ESLint for linting
- Prettier for formatting
- TypeScript strict mode enabled

### Testing
```bash
# Run tests
npm test

# Run e2e tests
npm run test:e2e
```

### Build
```bash
npm run build
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Docker
```bash
docker build -t ai-resume-maker .
docker run -p 3000:3000 ai-resume-maker
```

## Features Roadmap

- [x] Basic resume builder
- [x] Authentication
- [x] AI content generation
- [x] ATS scoring
- [ ] Cover letter generator
- [ ] LinkedIn profile optimizer
- [ ] Resume comparison tool
- [ ] Interview prep based on resume
- [ ] Job application tracker
- [ ] Chrome extension for one-click apply

## Contributing

Contributions are welcome! Please read the contributing guidelines first.

## License

MIT License - see LICENSE file for details

## Support

For support, email support@airesume.com or join our Discord community.
