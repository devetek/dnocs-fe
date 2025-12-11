import { Input } from '@/shared/presentation/atoms/Input';

import { useDcContext } from '../../model';

export default function Organization({ organization_id }: Props) {
  const { form } = useDcContext();

  return (
    <Input
      type="hidden"
      {...form.register('organization_id')}
      value={organization_id}
    />
  );
}

interface Props {
  organization_id: string;
}
