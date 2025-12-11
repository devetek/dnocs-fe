import { cn } from '@/shared/libs/tailwind/cn';

interface ResourceCardShimmerFullProps {
  classNameWrapper?: string;
}

export default function ResourceCardShimmerFull(
  props: ResourceCardShimmerFullProps,
) {
  const { classNameWrapper } = props;

  return (
    <div
      className={cn('border bg-card/40 shadow-xs rounded-xl', classNameWrapper)}
    >
      <div className="bg-card shadow-xs rounded-xl border-0 border-b p-3 flex items-center gap-2">
        <div className="size-12 rounded animate-pulse bg-gray-200 dark:bg-black/10" />

        <div className="flex flex-col gap-2">
          <div className="w-50 h-4 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
          <div className="w-20 h-4 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
        </div>
      </div>

      <div className="px-3 py-1 flex items-center gap-1">
        <div className="w-20 h-4 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
        <div className="w-40 h-4 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
      </div>
    </div>
  );
}
