import { useState } from 'react';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import type { SSHCreateModalProps as Props } from './types';

export const [SSHCreateProvider, useSSHCreateContext] = buildContext(
  'SSHKeyCreateModal',
  (props: Props) => {
    const [displayName, setDisplayName] = useState('');

    const [keyLength, setKeyLength] = useState<number>(4096);

    const [isMutating, setIsMutating] = useState(false);

    return {
      props,
      displayName,
      setDisplayName,
      keyLength,
      setKeyLength,
      isMutating,
      setIsMutating,
    };
  },
);
