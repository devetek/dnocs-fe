import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { KEY_LENGTH_LIST } from '../../config';
import { useSSHCreateContext } from '../../model';

export default function KeyLength() {
  const { keyLength, setKeyLength } = useSSHCreateContext();

  return (
    <>
      <p className="text-sm font-medium">Key Length</p>

      <Combobox
        classNameButton="w-full"
        value={keyLength}
        placeholder="Select SSH key length"
        items={KEY_LENGTH_LIST}
        onChange={setKeyLength}
      />
    </>
  );
}
