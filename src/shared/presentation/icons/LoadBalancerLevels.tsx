import { NetworkIcon, RouteIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

export function IconLoadBalancerL4(props: LucideProps) {
  const { className, ...rest } = props;

  const cnIcon = cn('text-blue-500', className);

  return <NetworkIcon {...rest} className={cnIcon} />;
}

export function IconLoadBalancerL7(props: LucideProps) {
  const { className, ...rest } = props;

  const cnIcon = cn('text-purple-500', className);

  return <RouteIcon {...rest} className={cnIcon} />;
}
