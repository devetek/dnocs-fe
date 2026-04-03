import { InputWithValidation } from '@/shared/presentation/molecules/InputWithValidation';

import { useSSHCreateContext } from '../../model';

export default function EngineCombo() {
  const { setDisplayName } = useSSHCreateContext();

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium">Key Name</p>
      <p className="text-xs text-primary/50">
        A label to help you identify this key, e.g. <em>work-laptop</em> or{' '}
        <em>home-mac</em>.
      </p>

      <InputWithValidation
        placeholder="e.g. work-laptop"
        onAcceptedChange={setDisplayName}
        validations={[
          /^[a-zA-Z0-9\s_]+$/,
          (value) =>
            value.length > 100 ? 'Must be 100 characters or less' : true,
        ]}
      />
    </div>
  );
}
