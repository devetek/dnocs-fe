import { PlusIcon, Trash2Icon } from 'lucide-react';
import { useFieldArray } from 'react-hook-form';

import { Button } from '@/shared/presentation/atoms/Button';
import { Input } from '@/shared/presentation/atoms/Input';

import { useApplicationRunEditModel } from '../../model';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="font-bold text-sm pb-2 border-b mb-3">{children}</h5>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-bold text-xs text-primary/70 mb-1">{children}</p>
  );
}

function RunCommandSection() {
  const { form } = useApplicationRunEditModel();

  return (
    <div className="flex flex-col gap-1 pb-4">
      <SectionTitle>Run Command</SectionTitle>
      <FieldLabel>Command</FieldLabel>
      <textarea
        {...form.register('command')}
        placeholder="e.g. node dist/index.js"
        rows={3}
        className="w-full text-sm font-mono rounded-md border border-input bg-background px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
      />
    </div>
  );
}

function RunEnvsSection() {
  const { form } = useApplicationRunEditModel();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'envs',
  });

  const handleAdd = () => {
    append({ key: '', value: '' });
  };

  return (
    <div className="flex flex-col gap-1 pb-4">
      <SectionTitle>Environment Variables</SectionTitle>

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 p-2 rounded-lg border bg-muted/30"
          >
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <FieldLabel>Key</FieldLabel>
                  <Input
                    {...form.register(`envs.${index}.key`)}
                    placeholder="ENV_KEY"
                    className="h-8 text-sm font-mono"
                  />
                  {form.formState.errors.envs?.[index]?.key?.message && (
                    <p className="text-xs text-destructive mt-0.5">
                      {String(form.formState.errors.envs[index].key.message)}
                    </p>
                  )}
                </div>
                <div>
                  <FieldLabel>Value</FieldLabel>
                  <Input
                    {...form.register(`envs.${index}.value`)}
                    placeholder="value"
                    className="h-8 text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="size-6 p-0 mt-5 text-muted-foreground hover:text-destructive shrink-0"
              onClick={() => remove(index)}
            >
              <Trash2Icon className="size-3" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-full gap-1"
        onClick={handleAdd}
      >
        <PlusIcon className="size-3" />
        Add Variable
      </Button>
    </div>
  );
}

export default function Forms() {
  return (
    <div>
      <RunCommandSection />
      <RunEnvsSection />
    </div>
  );
}
