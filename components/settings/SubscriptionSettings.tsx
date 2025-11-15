'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '@supabase/supabase-js';
import { Check, Crown } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionSettingsProps {
  user: User;
}

export function SubscriptionSettings({ user }: SubscriptionSettingsProps) {
  // TODO: Fetch actual subscription data from database
  const subscription = {
    plan: 'free',
    status: 'active',
    currentPeriodEnd: null,
  };

  const plans = {
    free: {
      name: 'Free',
      price: '$0',
      features: [
        '1 resume',
        'Basic templates',
        'PDF export',
        '10 AI rewrites/month',
        'Basic ATS score',
      ],
    },
    pro: {
      name: 'Pro',
      price: '$12',
      features: [
        'Unlimited resumes',
        'All premium templates',
        'PDF & DOCX export',
        'Unlimited AI rewrites',
        'Advanced ATS analysis',
        'Job description analyzer',
        'Priority support',
      ],
    },
  };

  const currentPlan = plans[subscription.plan as keyof typeof plans] || plans.free;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Current Plan</h2>
            <p className="text-sm text-muted-foreground">
              Manage your subscription and billing
            </p>
          </div>
          <Badge variant={subscription.plan === 'pro' ? 'default' : 'secondary'} className="gap-1">
            {subscription.plan === 'pro' && <Crown className="h-3 w-3" />}
            {currentPlan.name}
          </Badge>
        </div>

        <div className="mb-6 space-y-2">
          {currentPlan.features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {subscription.plan === 'free' ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Upgrade to Pro to unlock unlimited resumes, AI features, and advanced ATS analysis.
            </p>
            <Button asChild>
              <Link href="/pricing">Upgrade to Pro</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Your subscription renews on{' '}
                {subscription.currentPeriodEnd
                  ? new Date(subscription.currentPeriodEnd).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Manage Billing</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Usage This Month</h2>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">AI Rewrites</span>
              <span className="font-semibold">5 / {subscription.plan === 'pro' ? '∞' : '10'}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: subscription.plan === 'pro' ? '20%' : '50%' }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Resumes Created</span>
              <span className="font-semibold">2 / {subscription.plan === 'pro' ? '∞' : '1'}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-secondary">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: subscription.plan === 'pro' ? '10%' : '100%' }}
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Billing History</h2>
        <p className="text-sm text-muted-foreground">
          No billing history available. You are on the free plan.
        </p>
      </Card>
    </div>
  );
}
