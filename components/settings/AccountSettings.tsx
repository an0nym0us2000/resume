'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';

interface AccountSettingsProps {
  user: User;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [fullName, setFullName] = useState(user.user_metadata?.full_name || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Update user profile
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);

    try {
      // TODO: Send password reset email
      toast({
        title: 'Email Sent',
        description: 'Check your email for password reset link',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send password reset email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="mb-6 text-xl font-semibold">Profile Information</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed. Contact support if you need to update it.
            </p>
          </div>

          <Button type="submit" disabled={isLoading}>
            Save Changes
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="mb-6 text-xl font-semibold">Security</h2>
        <div className="space-y-4">
          <div>
            <Label>Password</Label>
            <p className="mb-4 text-sm text-muted-foreground">
              Update your password to keep your account secure
            </p>
            <Button variant="outline" onClick={handleChangePassword} disabled={isLoading}>
              Change Password
            </Button>
          </div>

          <Separator />

          <div>
            <Label>Account Created</Label>
            <p className="text-sm text-muted-foreground">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      <Card className="border-destructive p-6">
        <h2 className="mb-2 text-xl font-semibold text-destructive">Danger Zone</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="destructive" disabled>
          Delete Account
        </Button>
      </Card>
    </div>
  );
}
