import { InputWithValidation } from '@/shared/presentation/molecules/InputWithValidation';

import { useSSHCreateContext } from '../../model';

export default function EngineCombo() {
  const { setDisplayName } = useSSHCreateContext();

  return (
    <>
      <p className="text-sm font-medium">Display Name</p>

      <InputWithValidation
        placeholder="Enter a display name for the ssh key"
        onAcceptedChange={setDisplayName}
        validations={[
          /^[a-zA-Z0-9\s_]+$/,
          (value) =>
            value.length > 100 ? 'Must be 100 characters or less' : true,
        ]}
      />
    </>
  );
}
