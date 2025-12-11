import FieldBranchFrom from './FieldBranchFrom';
import FieldConfigFiles from './FieldConfigFiles';
import FieldWorkers from './FieldWorkers';

export default function Forms() {
  return (
    <div className="flex flex-col gap-4 overflow-y-auto">
      <FieldBranchFrom />
      <FieldConfigFiles />
      <FieldWorkers />
    </div>
  );
}
