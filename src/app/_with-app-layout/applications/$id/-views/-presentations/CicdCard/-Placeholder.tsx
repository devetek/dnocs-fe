import { Card } from '@/shared/presentation/atoms/Card';
import Shimmer from '@/shared/presentation/atoms/Shimmer';

export default function Placeholder() {
  return (
    <Card className="overflow-hidden shadow-none rounded-lg">
      <div className="flex items-center pl-1 gap-x-1">
        <Shimmer className="mx-1 my-1.5 h-4 w-7" />
        <Shimmer className="mx-1 my-1.5 h-4 w-16" />
        <Shimmer className="mx-1 my-1.5 h-4 w-11" />
      </div>

      <div className="bg-card rounded-[7px] p-3 pt-2 flex flex-col">
        <Shimmer className="my-1 h-5 w-[30%]" />
        <Shimmer className="my-0.5 h-4 w-[60%]" />

        <div className="mt-2 flex items-center flex-wrap gap-x-4 gap-y-1">
          <Shimmer className="h-4 w-24 shrink-0" />
          <Shimmer className="h-4 w-28 shrink-0" />
          <Shimmer className="h-4 w-26 shrink-0" />
        </div>
      </div>
    </Card>
  );
}
