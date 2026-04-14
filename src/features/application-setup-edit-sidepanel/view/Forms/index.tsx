import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '@/shared/presentation/atoms/Button';
import { Input } from '@/shared/presentation/atoms/Input';

import { useApplicationSetupEditModel } from '../../model';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h5 className="font-bold text-sm pb-2 border-b mb-3">{children}</h5>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="font-bold text-xs text-primary/70 mb-1">{children}</p>;
}

function PrimaryLanguageSection() {
  const { form } = useApplicationSetupEditModel();

  return (
    <div className="flex flex-col gap-1 pb-4">
      <SectionTitle>Primary Language</SectionTitle>
      <div className="flex flex-col gap-3 p-3 rounded-lg border bg-muted/30">
        <div>
          <FieldLabel>Name</FieldLabel>
          <Input
            {...form.register('language.name')}
            placeholder="e.g. nodejs"
            className="h-8 text-sm"
          />
          {form.formState.errors.language?.name?.message && (
            <p className="text-xs text-destructive mt-1">
              {String(form.formState.errors.language.name.message)}
            </p>
          )}
        </div>
        <div>
          <FieldLabel>Version</FieldLabel>
          <Input
            {...form.register('language.version')}
            placeholder="e.g. 20"
            className="h-8 text-sm"
          />
          {form.formState.errors.language?.version?.message && (
            <p className="text-xs text-destructive mt-1">
              {String(form.formState.errors.language.version.message)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function AdditionalLanguagesSection() {
  const { form } = useApplicationSetupEditModel();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'languages',
  });

  const handleAdd = () => {
    append({ name: '', version: '' });
  };

  return (
    <div className="flex flex-col gap-1">
      <SectionTitle>Additional Languages</SectionTitle>

      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 p-3 rounded-lg border bg-muted/30"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                Language {index + 1}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="size-6 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2Icon className="size-3" />
              </Button>
            </div>

            <div>
              <FieldLabel>Name</FieldLabel>
              <Input
                {...form.register(`languages.${index}.name`)}
                placeholder="e.g. python"
                className="h-8 text-sm"
              />
              {form.formState.errors.languages?.[index]?.name?.message && (
                <p className="text-xs text-destructive mt-1">
                  {String(form.formState.errors.languages[index].name.message)}
                </p>
              )}
            </div>

            <div>
              <FieldLabel>Version</FieldLabel>
              <Input
                {...form.register(`languages.${index}.version`)}
                placeholder="e.g. 3.11"
                className="h-8 text-sm"
              />
              {form.formState.errors.languages?.[index]?.version?.message && (
                <p className="text-xs text-destructive mt-1">
                  {String(form.formState.errors.languages[index].version.message)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3 gap-1 self-start"
        onClick={handleAdd}
      >
        <PlusIcon className="size-3" />
        Add Language
      </Button>
    </div>
  );
}

export default function Forms() {
  return (
    <div className="flex flex-col gap-2">
      <PrimaryLanguageSection />
      <AdditionalLanguagesSection />
    </div>
  );
}
