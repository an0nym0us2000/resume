import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AccountSettings } from '@/components/settings/AccountSettings';
import { SubscriptionSettings } from '@/components/settings/SubscriptionSettings';
import { User, CreditCard, Bell, Shield } from 'lucide-react';

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar user={user} />

      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account and subscription preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="space-y-8">
          <TabsList>
            <TabsTrigger value="account" className="gap-2">
              <User className="h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="subscription" className="gap-2">
              <CreditCard className="h-4 w-4" />
              Subscription
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="gap-2">
              <Shield className="h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <AccountSettings user={user} />
          </TabsContent>

          <TabsContent value="subscription">
            <SubscriptionSettings user={user} />
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Notification Preferences</h2>
              <p className="text-muted-foreground">
                Email notification settings coming soon.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Privacy & Data</h2>
              <p className="text-muted-foreground">
                Privacy settings and data management coming soon.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
