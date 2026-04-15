import FieldBranchFrom from './FieldBranchFrom';
import FieldWorkers from './FieldWorkers';

export default function Forms() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      <FieldBranchFrom />
      <FieldWorkers />
    </div>
  );
}
