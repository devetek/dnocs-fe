import type { LucideProps } from 'lucide-react';
import { PackageIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';

export default function UnknownBundleIcon(props: LucideProps) {
  const { className, ...rest } = props;

  return (
    <PackageIcon
      {...rest}
      className={cn(className, 'text-primary opacity-5')}
    />
  );
}
