import { useState } from 'react';

import useHandler from './useHandler';

export default function useToggle(initial = false) {
  const [value, setValue] = useState(initial);

  const toggle = useHandler(() => {
    setValue((v) => !v);
  });

  return [value, toggle] as const;
}
