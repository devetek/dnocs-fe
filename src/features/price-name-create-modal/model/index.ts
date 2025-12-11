import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { formSchema } from './form';
import type { PriceNameCreateModalProps as Props } from './types';

export const [DcProvider, useDcContext] = buildContext(
  'PriceNameCreateModal',
  (props: Props) => {
    const form = useForm({
      resolver: zodResolver(formSchema),
    });

    return {
      props,
      form,
    };
  },
);
