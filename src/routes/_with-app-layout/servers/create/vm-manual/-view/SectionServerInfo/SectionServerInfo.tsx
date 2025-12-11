import { HardDriveIcon } from 'lucide-react';

import { Input } from '@/shared/presentation/atoms/Input';

import { useForm } from '../../-model';
import { ErrorInline } from '../../-presentation/ErrorInline';
import { Sectioned } from '../../../-presentation/Sectioned';

export default function SectionAddress() {
  const { form, formErrors } = useForm();

  return (
    <Sectioned
      withinCard
      sectionIcon={HardDriveIcon}
      sectionTitle="Server Information"
      sectionDescription="Define your server address, ssh port and http port for dPanel Agent."
    >
      <h6 className="text-sm font-bold">Address</h6>
      <Input
        className="w-full"
        type="text"
        placeholder="Enter server address"
        {...form.register('server.address')}
      />
      <ErrorInline message={formErrors.server?.address?.message} />

      <h6 className="mt-4 text-sm font-bold">SSH Port</h6>
      <Input
        className="w-full"
        type="text"
        placeholder="Enter SSH Port"
        {...form.register('server.ssh_port')}
      />
      <ErrorInline message={formErrors.server?.ssh_port?.message} />

      <h6 className="mt-4 text-sm font-bold">HTTP Port</h6>
      <Input
        className="w-full"
        type="text"
        placeholder="Enter HTTP Port (Will be used by dPanel Agent)"
        {...form.register('server.http_port')}
      />
      <ErrorInline message={formErrors.server?.http_port?.message} />

      <h6 className="mt-4 text-sm font-bold">
        dPanel Agent Address (Optional)
      </h6>
      <Input
        className="w-full"
        type="text"
        placeholder="dPanel Agent if behind proxy / load balancer"
        {...form.register('server.domain')}
      />
      <ErrorInline message={formErrors.server?.http_port?.message} />
    </Sectioned>
  );
}
