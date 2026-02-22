import { useLbDetailsModel } from '../../models/lb-details';

import Timeline from './Timeline';

export default function AccessActivity() {
  const [activityTimeline] = useLbDetailsModel((s) => [s.activityTimeline]);

  if (activityTimeline.$status !== 'success') return null;

  return (
    <div className="flex flex-col w-full h-full overflow-hidden gap-y-1">
      <h5 className="text-xs font-bold text-primary">ACCESS ACTIVITY</h5>

      <div className="w-full h-full overflow-hidden overflow-y-auto bg-background inset-shadow-sm rounded-md p-3 flex flex-col gap-y-2">
        <Timeline timeline={activityTimeline} />
      </div>
    </div>
  );
}
