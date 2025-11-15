import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Settings as SettingsIcon,
  Mail,
  CreditCard,
  Shield,
  Bell,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-gray-600">Manage platform configuration</p>
      </div>

      {/* Settings Sections */}
      <div className="grid gap-6">
        {/* General Settings */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <SettingsIcon className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              General Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input
                id="platform-name"
                defaultValue="AI Resume Maker"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                defaultValue="support@airesume.com"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="announcement">Platform Announcement</Label>
              <Textarea
                id="announcement"
                placeholder="Display a message to all users..."
                className="mt-2"
              />
            </div>
            <Button>Save Changes</Button>
          </div>
        </Card>

        {/* Email Settings */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Email Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Welcome Email</p>
                <p className="text-sm text-gray-600">
                  Send welcome email to new users
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Weekly Reports</p>
                <p className="text-sm text-gray-600">
                  Send weekly analytics reports
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Marketing Emails</p>
                <p className="text-sm text-gray-600">
                  Allow marketing communications
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Payment Settings */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Payment Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stripe-key">Stripe Publishable Key</Label>
              <Input
                id="stripe-key"
                type="password"
                defaultValue="pk_test_••••••••••••••••"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="stripe-secret">Stripe Secret Key</Label>
              <Input
                id="stripe-secret"
                type="password"
                defaultValue="sk_test_••••••••••••••••"
                className="mt-2"
              />
            </div>
            <Button>Update Keys</Button>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Shield className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Security Settings
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">
                  Require 2FA for admin access
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Session Timeout</p>
                <p className="text-sm text-gray-600">
                  Auto-logout after 30 minutes of inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Login Notifications</p>
                <p className="text-sm text-gray-600">
                  Notify admins of new logins
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="mb-4 flex items-center gap-3">
            <Bell className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New User Alerts</p>
                <p className="text-sm text-gray-600">
                  Get notified when users sign up
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Payment Alerts</p>
                <p className="text-sm text-gray-600">
                  Get notified of new subscriptions
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Error Alerts</p>
                <p className="text-sm text-gray-600">
                  Get notified of system errors
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
