import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';

import { useServerEditModel } from '../../model';
import { ImportantMarker } from '../_presentation';

export default function Forms() {
  const { form } = useServerEditModel();

  return (
    <div>
      <div className="flex flex-col gap-1 pb-6">
        <p className="font-bold text-xs text-primary/70">
          Server Address
          <ImportantMarker />
        </p>
        <Input {...form.register('serverAddress')} />
        <ErrorInline message={form.formState.errors.serverAddress?.message} />
      </div>

      <h5 className="font-bold text-sm pb-2">SSH Information</h5>

      <div className="flex flex-col gap-1 pb-4">
        <p className="font-bold text-xs text-primary/70">
          Username
          <ImportantMarker />
        </p>
        <Input {...form.register('ssh.username')} />
        <ErrorInline message={form.formState.errors.ssh?.username?.message} />
      </div>

      <div className="flex flex-col gap-1 pb-6">
        <p className="font-bold text-xs text-primary/70">
          Port
          <ImportantMarker />
        </p>
        <Input
          type="number"
          {...form.register('ssh.port', { valueAsNumber: true })}
        />
        <ErrorInline message={form.formState.errors.ssh?.port?.message} />
      </div>

      <h5 className="font-bold text-sm pb-2">Agent Information</h5>

      <div className="flex flex-col gap-1 pb-4">
        <div className="flex flex-col gap-1 pb-6">
          <p className="font-bold text-xs text-primary/70">
            HTTP Port
            <ImportantMarker />
          </p>
          <Input
            type="number"
            {...form.register('agent.httpPort', { valueAsNumber: true })}
          />
          <ErrorInline
            message={form.formState.errors.agent?.httpPort?.message}
          />
        </div>

        <p className="font-bold text-xs text-primary/70">Domain</p>
        <Input {...form.register('agent.domain')} />
        <ErrorInline message={form.formState.errors.agent?.domain?.message} />
      </div>
    </div>
  );
}
