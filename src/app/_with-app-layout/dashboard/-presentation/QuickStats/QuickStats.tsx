import { Link } from '@tanstack/react-router';
import { CloudIcon, KeyRoundIcon, LayoutGridIcon, ServerIcon } from 'lucide-react';
import type { ElementType } from 'react';

import { cn } from '@/shared/libs/tailwind/cn';
import { Card } from '@/shared/presentation/atoms/Card';
import Shimmer from '@/shared/presentation/atoms/Shimmer';

// =============================================================================
//   Types
// =============================================================================

interface StatItem {
  label: string;
  value: number | undefined;
  icon: ElementType;
  to: string;
  colorClass: string;
}

export interface QuickStatsProps {
  serverCount: number | undefined;
  appCount: number | undefined;
  sshKeyCount: number | undefined;
  cloudCount: number | undefined;
  isLoading?: boolean;
}

// =============================================================================
//   Sub-component
// =============================================================================

function StatCard({ stat }: { stat: StatItem }) {
  if (stat.value === undefined) {
    return (
      <Card className="p-4 flex flex-col gap-3">
        <Shimmer className="h-8 w-8 rounded-lg" />
        <Shimmer className="h-8 w-16 mt-1" />
        <Shimmer className="h-4 w-24" />
      </Card>
    );
  }

  const Icon = stat.icon;

  return (
    <Link to={stat.to} className="block group">
      <Card
        className={cn(
          'p-4 flex flex-col gap-2 transition-all duration-200',
          'hover:shadow-md hover:-translate-y-0.5 cursor-pointer',
          'border border-border/50 hover:border-border',
        )}
      >
        <div
          className={cn(
            'w-9 h-9 rounded-xl flex items-center justify-center',
            stat.colorClass,
          )}
        >
          <Icon className="w-4 h-4" />
        </div>

        <p className="text-3xl font-bold tabular-nums text-primary leading-none mt-1">
          {stat.value}
        </p>

        <p className="text-sm text-primary/60 font-medium">{stat.label}</p>
      </Card>
    </Link>
  );
}

// =============================================================================
//   Component
// =============================================================================

export default function QuickStats(props: QuickStatsProps) {
  const { serverCount, appCount, sshKeyCount, cloudCount } = props;

  const stats: StatItem[] = [
    {
      label: 'Servers',
      value: serverCount,
      icon: ServerIcon,
      to: '/servers',
      colorClass: 'bg-blue-500/10 text-blue-500',
    },
    {
      label: 'Applications',
      value: appCount,
      icon: LayoutGridIcon,
      to: '/applications',
      colorClass: 'bg-violet-500/10 text-violet-500',
    },
    {
      label: 'SSH Keys',
      value: sshKeyCount,
      icon: KeyRoundIcon,
      to: '/backend/secret-managers/ssh-key',
      colorClass: 'bg-amber-500/10 text-amber-500',
    },
    {
      label: 'Cloud Accounts',
      value: cloudCount,
      icon: CloudIcon,
      to: '/backend/cloud-projects',
      colorClass: 'bg-green-500/10 text-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}
