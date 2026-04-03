import { Button } from '@/shared/presentation/atoms/Button';

import { useCpcFormContext } from '../../model/forms/context';
import type { SchemaGcpForm } from '../../model/forms/schema';
import { schemaGcpForm } from '../../model/forms/schema';
import useModelSubmission from '../../model/submission';
import { ReadOnlyView } from '../../presentation/ReadOnlyView';
import { SubmitButton } from '../../presentation/SubmitButton';
import { UploadArea } from '../../presentation/UploadArea';

export default function FormGCP() {
  const { formGCP: form } = useCpcFormContext();

  const { isSubmitting, handleSubmit } = useModelSubmission();

  const handleUploadData = (data: SchemaGcpForm) => {
    for (const [key, value] of Object.entries(data)) {
      form.setValue(key as keyof SchemaGcpForm, value);
    }
  };

  const handleClickClear = () => {
    form.reset();
  };

  const values = form.watch();

  const isUploaded = Object.values(values).length > 0;

  return (
    <section className="flex flex-col mt-6">
      {!isUploaded ? (
        <UploadArea schema={schemaGcpForm} onUploadData={handleUploadData} />
      ) : (
        <div className="flex flex-col gap-2">
          <ReadOnlyView data={values} />

          <Button variant="secondary" onClick={handleClickClear}>
            Clear
          </Button>

          <SubmitButton isSubmitting={isSubmitting} onClick={handleSubmit} />
        </div>
      )}
    </section>
  );
}
