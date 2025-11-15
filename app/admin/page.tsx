import { Card } from '@/components/ui/card';
import { Users, FileText, DollarSign, TrendingUp } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  // Fetch statistics
  const [totalUsers, totalResumes, activeSubscriptions] = await Promise.all([
    prisma.user.count(),
    prisma.resume.count(),
    prisma.user.count({
      where: {
        subscriptionStatus: {
          in: ['active', 'trialing'],
        },
      },
    }),
  ]);

  const stats = [
    {
      name: 'Total Users',
      value: totalUsers.toLocaleString(),
      icon: Users,
      change: '+12%',
      changeType: 'positive',
    },
    {
      name: 'Total Resumes',
      value: totalResumes.toLocaleString(),
      icon: FileText,
      change: '+18%',
      changeType: 'positive',
    },
    {
      name: 'Active Subscriptions',
      value: activeSubscriptions.toLocaleString(),
      icon: TrendingUp,
      change: '+8%',
      changeType: 'positive',
    },
    {
      name: 'Monthly Revenue',
      value: `$${(activeSubscriptions * 9.99).toFixed(2)}`,
      icon: DollarSign,
      change: '+23%',
      changeType: 'positive',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">
          Overview of your platform's performance
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.name}
                </p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span
                className={`text-sm font-medium ${
                  stat.changeType === 'positive'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {stat.change}
              </span>
              <span className="ml-2 text-sm text-gray-600">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Users */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Users
          </h2>
          <div className="space-y-4">
            {/* TODO: Fetch real recent users */}
            <p className="text-sm text-gray-500">
              No recent activity to display
            </p>
          </div>
        </Card>

        {/* Recent Resumes */}
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Recent Resumes Created
          </h2>
          <div className="space-y-4">
            {/* TODO: Fetch real recent resumes */}
            <p className="text-sm text-gray-500">
              No recent activity to display
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
