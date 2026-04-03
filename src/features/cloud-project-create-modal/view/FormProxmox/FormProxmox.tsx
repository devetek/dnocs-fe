import { useState } from 'react';

import { Button } from '@/shared/presentation/atoms/Button';

import { useCpcFormContext } from '../../model/forms/context';
import type { SchemaProxmoxForm, SchemaProxmoxUpload } from '../../model/forms/schema';
import { schemaProxmoxUpload } from '../../model/forms/schema';
import useModelSubmission from '../../model/submission';
import { SubmitButton } from '../../presentation/SubmitButton';
import { UploadArea } from '../../presentation/UploadArea';

// ---------------------------------------------------------------------------
// Credential summary after upload
// ---------------------------------------------------------------------------

const SummaryRow = ({ label, value, hidden }: { label: string; value?: string | number; hidden?: boolean }) => {
  const [visible, setVisible] = useState(!hidden);
  const display = value !== undefined && value !== '' ? String(value) : <em className="opacity-40">—</em>;

  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-xs font-medium text-primary/60">{label}</p>
      <div className="flex items-center gap-2">
        <pre className="flex-1 border bg-background px-3 py-1.5 rounded-lg text-sm whitespace-pre-wrap break-all">
          {visible ? display : <em className="opacity-30">Hidden</em>}
        </pre>
        {hidden && (
          <Button variant="ghost" size="xs" onClick={() => setVisible((v) => !v)}>
            {visible ? '🙈' : '👁'}
          </Button>
        )}
      </div>
    </div>
  );
};

const CredentialSummary = ({ values }: { values: SchemaProxmoxUpload }) => {
  const auth = values.credential.auth;
  const config = values.credential.config;

  return (
    <div className="flex flex-col gap-4 mb-4 p-3 border rounded-lg bg-muted/30">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-primary/50 uppercase tracking-wide">Auth</p>
        <SummaryRow label="api_host" value={auth.api_host} />
        <SummaryRow label="api_user" value={auth.api_user} />
        <SummaryRow label="api_token_id" value={auth.api_token_id} />
        <SummaryRow label="api_token_secret" value={auth.api_token_secret} hidden />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-primary/50 uppercase tracking-wide">Config</p>
        <SummaryRow label="node" value={config.node} />
        {config.netif && (
          <SummaryRow label="netif" value={JSON.stringify(config.netif)} />
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// FormProxmox
// ---------------------------------------------------------------------------

export default function FormProxmox() {
  const { formProxmox: form } = useCpcFormContext();
  const { isSubmitting, handleSubmit } = useModelSubmission();

  const [uploadedData, setUploadedData] = useState<SchemaProxmoxUpload | null>(null);

  const handleUploadData = (data: SchemaProxmoxUpload) => {
    form.reset(data as SchemaProxmoxForm);
    setUploadedData(data);
  };

  const handleClickClear = () => {
    form.reset();
    setUploadedData(null);
  };

  return (
    <section className="flex flex-col mt-6">
      {!uploadedData ? (
        <UploadArea schema={schemaProxmoxUpload} onUploadData={handleUploadData} />
      ) : (
        <div className="flex flex-col gap-2">
          <CredentialSummary values={uploadedData} />

          <Button variant="secondary" onClick={handleClickClear}>
            Clear
          </Button>

          <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
        </div>
      )}
    </section>
  );
}
