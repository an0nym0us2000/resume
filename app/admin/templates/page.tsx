import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Copy,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export default async function TemplatesPage() {
  // Fetch templates
  const templates = await prisma.template.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
          <p className="mt-2 text-gray-600">
            Manage resume templates and layouts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.length === 0 ? (
          <Card className="col-span-full p-12 text-center">
            <p className="mb-4 text-gray-500">No templates found</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create First Template
            </Button>
          </Card>
        ) : (
          templates.map((template: {
            id: string;
            name: string;
            description: string | null;
            isPremium: boolean;
            isActive: boolean;
          }) => (
            <Card key={template.id} className="overflow-hidden">
              {/* Preview */}
              <div className="aspect-[8.5/11] border-b bg-gray-50 p-4">
                <div className="flex h-full items-center justify-center text-gray-400">
                  {/* TODO: Render actual template preview */}
                  <div className="text-center">
                    <Eye className="mx-auto mb-2 h-12 w-12" />
                    <p className="text-sm">Template Preview</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {template.name}
                    </h3>
                    {template.description && (
                      <p className="mt-1 text-sm text-gray-600">
                        {template.description}
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant={template.isPremium ? 'default' : 'secondary'}>
                    {template.isPremium ? 'Premium' : 'Free'}
                  </Badge>
                  {template.isActive && (
                    <Badge variant="outline">Active</Badge>
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="mr-2 h-3 w-3" />
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <p className="text-sm text-gray-600">Total Templates</p>
          <p className="mt-1 text-2xl font-bold">{templates.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Active Templates</p>
          <p className="mt-1 text-2xl font-bold">
            {templates.filter((t: { isActive: boolean }) => t.isActive).length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">Premium Templates</p>
          <p className="mt-1 text-2xl font-bold">
            {templates.filter((t: { isPremium: boolean }) => t.isPremium).length}
          </p>
        </Card>
      </div>
    </div>
  );
}
