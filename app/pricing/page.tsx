import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function PricingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out our platform',
      features: [
        '1 resume',
        'Basic templates',
        'PDF export',
        'Real-time preview',
        '10 AI rewrites per month',
        'Basic ATS score',
      ],
      cta: user ? 'Current Plan' : 'Get Started',
      href: user ? '/dashboard' : '/auth/signup',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For serious job seekers',
      features: [
        'Unlimited resumes',
        'All premium templates',
        'PDF & DOCX export',
        'Real-time preview',
        'Unlimited AI rewrites',
        'Advanced ATS analysis',
        'Job description analyzer',
        'Keyword optimization',
        'Version history',
        'Priority support',
      ],
      cta: 'Upgrade to Pro',
      href: '/auth/signup?plan=pro',
      highlighted: true,
    },
    {
      name: 'Lifetime',
      price: '$99',
      period: 'one-time',
      description: 'Pay once, use forever',
      features: [
        'Everything in Pro',
        'Lifetime access',
        'All future features',
        'Early access to new templates',
        'Premium support',
        'No monthly fees',
      ],
      cta: 'Get Lifetime Access',
      href: '/auth/signup?plan=lifetime',
      highlighted: false,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <section className="container px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose the plan that works best for you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative p-8 ${
                  plan.highlighted
                    ? 'glass-card border-2 border-primary shadow-xl'
                    : 'glass-card'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </div>

                <Button
                  className="mb-6 w-full"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  asChild
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              All plans include a 7-day money-back guarantee.{' '}
              <Link href="/contact" className="underline">
                Contact us
              </Link>{' '}
              for custom enterprise plans.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
