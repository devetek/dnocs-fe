import { Card } from '../../atoms/Card';
import Shimmer from '../../atoms/Shimmer';

interface PageHeaderShimmerProps {
  hasHeadnote?: boolean;
  hasRightAppend?: boolean;
  hasStatuses?: boolean;
  hasFootnote?: boolean;
}

export default function PageHeaderShimmer(props: PageHeaderShimmerProps) {
  const { hasHeadnote, hasStatuses, hasRightAppend } = props;

  return (
    <Card className="rounded-xl sm:rounded-2xl shadow-xs mb-8 bg-card/40">
      {hasHeadnote && (
        <div className="px-3 sm:px-4 py-1">
          <Shimmer className="w-40 h-5" />
        </div>
      )}

      <Card className="rounded-xl sm:rounded-2xl border-none shadow-sm bg-card py-3 px-3 sm:py-6 sm:px-5 flex justify-between items-center gap-1">
        <div className="flex flex-col">
          <Shimmer className="w-80 h-9" />

          {hasStatuses && <Shimmer className="mt-2 w-30 h-5" />}
        </div>

        {hasRightAppend && <Shimmer className="size-14 rounded-full" />}
      </Card>
    </Card>
  );
}
