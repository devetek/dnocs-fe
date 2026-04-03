import { ExternalLinkIcon } from 'lucide-react';

import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { TextArea } from '@/shared/presentation/atoms/TextArea';

import { useCpcFormContext } from '../../model/forms/context';
import useModelSubmission from '../../model/submission';
import { SubmitButton } from '../../presentation/SubmitButton';

export default function FormIDCloudHost() {
  const { formIDCloudHost: form } = useCpcFormContext();
  const { handleSubmit, isSubmitting } = useModelSubmission();

  return (
    <section className="flex flex-col mt-6 gap-4">
      <div className="rounded-lg border border-border bg-muted/30 p-3 flex flex-col gap-1">
        <p className="text-xs font-semibold text-primary/80">
          Where to find your API Token
        </p>
        <ol className="text-xs text-primary/60 list-decimal list-inside space-y-1">
          <li>
            Log in to your{' '}
            <a
              href="https://console.idcloudhost.com/user-profile/api"
              target="_blank"
              rel="noreferrer"
              className="underline inline-flex items-center gap-0.5"
            >
              IDCloudHost Console
              <ExternalLinkIcon className="w-2.5 h-2.5" />
            </a>
          </li>
          <li>Go to <strong>User Profile → API</strong></li>
          <li>Click <strong>Generate Token</strong> and copy the value</li>
          <li>Paste the token into the field below</li>
        </ol>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">API Token</p>
        <p className="text-xs text-primary/50">
          The token is stored encrypted and is only used to communicate with
          the IDCloudHost API.
        </p>

        <TextArea
          rows={3}
          placeholder="Paste your API token here..."
          {...form.register('token')}
        />

        <ErrorInline message={form.formState.errors.token?.message} />
      </div>

      <SubmitButton
        isSubmitting={isSubmitting}
        onClick={handleSubmit}
      />
    </section>
  );
}
