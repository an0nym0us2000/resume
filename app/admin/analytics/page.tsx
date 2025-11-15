import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Download,
  Sparkles,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

type AiUsageWithUser = {
  id: string;
  type: string;
  userId: string;
  tokens: number;
  createdAt: Date;
};

export default async function AnalyticsPage() {
  // Fetch analytics data
  const [
    totalUsers,
    totalResumes,
    totalAiUsage,
    activeSubscriptions,
    recentAiUsage,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.aiUsage.count(),
    prisma.user.count({
      where: {
        subscriptionStatus: {
          in: ['active', 'trialing'],
        },
      },
    }),
    prisma.aiUsage.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  // Calculate revenue
  const monthlyRevenue = activeSubscriptions * 9.99;
  const annualRevenue = monthlyRevenue * 12;

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers.toLocaleString(),
      icon: Users,
      description: 'Registered users',
    },
    {
      name: 'Total Resumes',
      value: totalResumes.toLocaleString(),
      icon: FileText,
      description: 'Resumes created',
    },
    {
      name: 'AI Generations',
      value: totalAiUsage.toLocaleString(),
      icon: Sparkles,
      description: 'AI operations performed',
    },
    {
      name: 'Active Subscriptions',
      value: activeSubscriptions.toLocaleString(),
      icon: TrendingUp,
      description: 'Paying customers',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="mt-2 text-gray-600">
          Platform usage and performance metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-blue-100 p-3">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">{stat.description}</p>
          </Card>
        ))}
      </div>

      {/* Revenue */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Revenue Overview
            </h2>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Monthly Recurring Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ${monthlyRevenue.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Annual Run Rate</p>
              <p className="text-2xl font-semibold text-gray-700">
                ${annualRevenue.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Revenue Per User</p>
              <p className="text-xl font-semibold text-gray-700">
                ${totalUsers > 0 ? (monthlyRevenue / totalUsers).toFixed(2) : '0.00'}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              User Engagement
            </h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Avg Resumes per User</p>
              <p className="text-3xl font-bold text-gray-900">
                {totalUsers > 0 ? (totalResumes / totalUsers).toFixed(1) : '0'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg AI Usage per User</p>
              <p className="text-2xl font-semibold text-gray-700">
                {totalUsers > 0 ? (totalAiUsage / totalUsers).toFixed(1) : '0'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-xl font-semibold text-gray-700">
                {totalUsers > 0
                  ? ((activeSubscriptions / totalUsers) * 100).toFixed(1)
                  : '0'}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent AI Usage */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent AI Usage
          </h2>
          <Badge variant="outline">{recentAiUsage.length} operations</Badge>
        </div>
        <div className="space-y-3">
          {recentAiUsage.length === 0 ? (
            <p className="text-sm text-gray-500">No AI usage yet</p>
          ) : (
            recentAiUsage.map((usage: AiUsageWithUser) => (
              <div
                key={usage.id}
                className="flex items-center justify-between rounded-lg border p-3"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{usage.type}</p>
                  <p className="text-sm text-gray-500">{usage.tokens} tokens</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">User: {usage.userId.slice(0, 8)}</Badge>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(usage.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Template Usage */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Template Usage
          </h2>
          <Download className="h-5 w-5 text-gray-400" />
        </div>
        <p className="text-sm text-gray-500">
          Template usage analytics will appear here
        </p>
      </Card>
    </div>
  );
}
