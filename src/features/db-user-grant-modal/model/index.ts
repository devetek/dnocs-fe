import { useState } from 'react';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { GAL_MARIADB, GAL_POSTGRESQL } from '../config';

import type { DbUserGrantModalProps as Props, SelectedDB } from './types';

export const [DugProvider, useDugContext] = buildContext(
  'DbUserGrantModal',
  (props: Props) => {
    const [selectedDB, setSelectedDB] = useState<SelectedDB>();

    const [checkedAccess, setCheckedAccess] = useState<string[]>([]);

    const [checkWithGrantOpt, setCheckWithGrantOpt] = useState(false);

    const [isMutating, setIsMutating] = useState(false);

    let accessList: string[] = [];

    switch (props.selectedUserDbEngine) {
      case 'postgresql':
        accessList = GAL_POSTGRESQL;
        break;

      case 'mariadb':
        accessList = GAL_MARIADB;
        break;
    }

    return {
      props,
      selectedDB,
      setSelectedDB,
      checkedAccess,
      setCheckedAccess,
      checkWithGrantOpt,
      setCheckWithGrantOpt,
      isMutating,
      setIsMutating,
      accessList,
    };
  },
);
