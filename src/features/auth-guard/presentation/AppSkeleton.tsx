import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

export default function AppSkeleton() {
  const isDesktop = useBreakpoint('md', true);

  const elContent = (
    <div className="w-full h-full p-3 max-w-[1280px] m-auto grid grid-rows-[auto_1fr]">
      <div className="h-26 w-full rounded-2xl animate-pulse bg-black/5" />

      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <div className="w-svw h-svh grid grid-cols-[280px_1fr]">
        <div className="p-3">
          <div className="h-full w-full border rounded-2xl bg-card/40 shadow-xs flex flex-col">
            <div className="grow bg-card border-b rounded-2xl shadow-sm">
              <div className="px-2 pt-1 pb-3">
                <div className="px-3 py-2">
                  <div className="h-7 w-20 rounded animate-pulse bg-black/5" />
                </div>
              </div>

              <div className="px-4 pb-6">
                <div className="w-full h-14 rounded-lg animate-pulse bg-black/5" />
              </div>

              <div className="px-4 pb-2 flex flex-col gap-2">
                <div className="h-4 w-20 rounded animate-pulse bg-black/5" />
                <div className="h-10 w-full rounded animate-pulse bg-black/5" />
                <div className="opacity-60 h-10 w-full rounded animate-pulse bg-black/5" />
                <div className="opacity-20 h-10 w-full rounded animate-pulse bg-black/5" />
              </div>
            </div>

            <div className="p-2 flex justify-between items-center">
              <div className="w-24 h-5 rounded bg-black/5" />

              <div className="flex items-center gap-4 pr-1">
                <div className="size-6 rounded animate-pulse bg-black/5" />
                <div className="size-6 rounded animate-pulse bg-black/5" />
              </div>
            </div>
          </div>
        </div>

        {elContent}
      </div>
    );
  }

  return (
    <div className="w-svw h-svh">
      <div className="w-full p-2 h-16 grid grid-cols-[1fr_auto_1fr]">
        <div>
          <div className="w-12 h-10 rounded animate-pulse bg-black/5" />
        </div>

        <div className="w-26 h-11 px-3 py-2">
          <div className="w-full h-full rounded animate-pulse bg-black/5" />
        </div>
      </div>
      {elContent}
    </div>
  );
}
