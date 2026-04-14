import { cn } from '@/shared/libs/tailwind/cn';

export interface UsageLabelProps {
  usagePercentage?: number;
}

export default function UsageLabel(props: UsageLabelProps) {
  const { usagePercentage } = props;

  const cnWrapperBase = 'text-sm font-bold flex items-center gap-1';

  if (
    usagePercentage == null ||
    isNaN(usagePercentage) ||
    usagePercentage < 0
  ) {
    return <p className={cnWrapperBase}>-</p>;
  }

  const cnWrapper = cn(cnWrapperBase, {
    'text-red-500': usagePercentage > 90,
    'text-yellow-500': usagePercentage > 70 && usagePercentage <= 90,
    'text-green-500': usagePercentage <= 70,
  });

  return <p className={cnWrapper}>{`${usagePercentage.toFixed(2)}%`}</p>;
}
