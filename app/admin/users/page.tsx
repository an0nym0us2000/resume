import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, MoreVertical, Ban, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { prisma } from '@/lib/prisma';

type UserWithResumes = {
  id: string;
  email: string;
  subscriptionStatus: string | null;
  stripeCustomerId: string | null;
  createdAt: Date;
  resumes: { id: string }[];
};

export default async function UsersPage() {
  // Fetch users with their resume counts
  const users = await prisma.user.findMany({
    include: {
      resumes: {
        select: { id: true },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  });

  const usersWithCounts = users.map((user: UserWithResumes) => ({
    id: user.id,
    email: user.email,
    subscriptionStatus: user.subscriptionStatus || 'free',
    resumeCount: user.resumes.length,
    createdAt: user.createdAt,
    stripeCustomerId: user.stripeCustomerId,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-2 text-gray-600">Manage platform users and subscriptions</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="w-64 pl-10"
            />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resumes</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Stripe ID</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usersWithCounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              usersWithCounts.map((user: {
                id: string;
                email: string;
                subscriptionStatus: string;
                resumeCount: number;
                createdAt: Date;
                stripeCustomerId: string | null;
              }) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.subscriptionStatus === 'active' ||
                        user.subscriptionStatus === 'trialing'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {user.subscriptionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.resumeCount}</TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-gray-500">
                      {user.stripeCustomerId || '-'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Manage Subscription
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Ban className="mr-2 h-4 w-4" />
                          Suspend User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {usersWithCounts.length} users
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
