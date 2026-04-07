import { ExternalLink, MoreVertical, Settings, Trash2 } from 'lucide-react';

import { useDevetekLocale } from '@/services/i18n';

import { getDistanceFromNow } from '@/shared/libs/browser/date';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/presentation/atoms/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/presentation/atoms/DropdownMenu';

const applications = [
  {
    id: 1,
    name: 'Portfolio Website',
    type: 'Next.js',
    url: 'portfolio.devetek.com',
    created_at: '2025-07-29 22:00:00.000000 +0700 WIB',
  },
  {
    id: 2,
    name: 'API Gateway',
    type: 'Node.js',
    url: 'api.devetek.com',
    created_at: '2025-07-28 12:00:00.000000 +0700 WIB',
  },
  {
    id: 3,
    name: 'Admin Dashboard',
    type: 'React',
    url: 'admin.devetek.com',
    created_at: '2025-07-26 10:00:00.000000 +0700 WIB',
  },
  {
    id: 4,
    name: 'Blog Platform',
    type: 'WordPress',
    url: 'blog.devetek.com',
    created_at: '2025-07-24 08:00:00.000000 +0700 WIB',
  },
  {
    id: 5,
    name: 'E-commerce Store',
    type: 'Vue.js',
    url: 'store.devetek.com',
    created_at: '2025-07-22 09:00:00.000000 +0700 WIB',
  },
];

export default function MyApplications() {
  const locale = useDevetekLocale();
  return (
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg">Applications</CardTitle>
        <CardDescription>Your deployed applications</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="p-3 rounded-lg bg-gray-800 border border-gray-700"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{app.name}</h4>
                <p className="text-xs text-gray-400">{app.type}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-gray-800 border-gray-700"
                >
                  <DropdownMenuItem>
                    <ExternalLink className="h-3 w-3 mr-2" />
                    Open
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-3 w-3 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-400">
                    <Trash2 className="h-3 w-3 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="text-xs text-gray-500 mb-2">{app.url}</div>
            <div className="text-xs text-gray-500">
              Created: {getDistanceFromNow(app.created_at, locale)}
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          View All Applications
        </Button>
      </CardContent>
    </Card>
  );
}
