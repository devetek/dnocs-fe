import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { TextArea } from '@/shared/presentation/atoms/TextArea';

import { useCpcFormContext } from '../../model/forms/context';
import useModelSubmission from '../../model/submission';
import { SubmitButton } from '../../presentation/SubmitButton';

export default function FormIDCloudHost() {
  const { formIDCloudHost: form } = useCpcFormContext();
  const { handleSubmit, isSubmitting } = useModelSubmission();

  return (
    <>
      <section className="flex flex-col mt-6">
        <p className="text-sm font-medium">Cloud Token</p>

        <TextArea placeholder="Cloud Token" {...form.register('token')} />

        <ErrorInline message={form.formState.errors.token?.message} />
      </section>

      <SubmitButton
        classNameWrapper="mt-6"
        isSubmitting={isSubmitting}
        onClick={handleSubmit}
      />
    </>
  );
}
