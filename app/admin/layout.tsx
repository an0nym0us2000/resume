import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  LayoutTemplate,
  BarChart3,
  Settings,
  Home,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  // TODO: Add admin role check
  // For now, allow any authenticated user
  // In production, check if user.email is in admin list or has admin role

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Home },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Templates', href: '/admin/templates', icon: LayoutTemplate },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="mb-3 rounded-lg bg-gray-50 p-3">
              <p className="text-sm font-medium text-gray-900">
                {user.email}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard">
                <LogOut className="mr-2 h-4 w-4" />
                Exit Admin
              </Link>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
