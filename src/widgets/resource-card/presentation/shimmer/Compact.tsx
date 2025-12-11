import { cn } from '@/shared/libs/tailwind/cn';

interface ResourceCardShimmerCompactProps {
  classNameWrapper?: string;
}

export default function ResourceCardShimmerCompact(
  props: ResourceCardShimmerCompactProps,
) {
  const { classNameWrapper } = props;

  return (
    <div
      className={cn('border bg-card/40 shadow-xs rounded-xl', classNameWrapper)}
    >
      <div className="bg-card shadow-xs rounded-xl border-0 border-b flex flex-col">
        <div className="border-0 border-b p-3 flex gap-2">
          <div className="size-9 rounded animate-pulse bg-gray-200 dark:bg-black/10" />

          <div className="flex flex-col gap-2">
            <div className="w-20 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
            <div className="w-16 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
            <div className="w-10 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
          </div>
        </div>

        <div className="p-3 grid border-b grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="w-14 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
            <div className="w-12 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
            <div className="w-10 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="w-14 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
            <div className="w-12 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
            <div className="w-10 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="p-3 flex justify-center border-r gap-2">
            <div className="w-6 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
          </div>

          <div className="p-3 flex justify-center gap-2">
            <div className="w-6 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
          </div>
        </div>
      </div>

      <div className="px-2 py-1.5 flex items-center gap-1">
        <div className="w-20 h-3 rounded animate-pulse bg-gray-200 dark:bg-black/10" />
      </div>
    </div>
  );
}
