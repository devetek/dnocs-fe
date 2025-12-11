import { useMemo } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { DatabaseIcon, SettingsIcon, SquareTerminalIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type { ZodRawShape, ZodString } from 'zod';
import { z } from 'zod';

import { PREDEFINED_CONFIG } from '../../../-config/predefined_config';
import useProgressCta from '../../../-model/progress-cta';
import { useFormStore } from '../../../-model/store/form';
import CtaBar from '../../../-presentation/CtaBar/CtaBar';
import { Sectioned } from '../../../-presentation/Sectioned';

import { DynFormInput } from './DynFormInput';

export default function Step3Config() {
  const [appSourceMode, dynamicConfig, setDynamicConfig] = useFormStore((s) => [
    s.appSourceMode,
    s.dynamicConfig,
    s.setDynamicConfig,
  ]);

  const { goToNext, goToPrevious, isNextDisabled, isPreviousHidden } =
    useProgressCta();

  const generatedSchema = useMemo(() => {
    const schema: ZodRawShape = {};

    for (const group of PREDEFINED_CONFIG[appSourceMode].groups) {
      const { group_id, fields } = group;

      const groupSchema: ZodRawShape = {};

      for (const field of fields) {
        const { id, type, validation_regex, is_required } = field;

        switch (type) {
          case 'cbo_database_type':
          case 'input_text_password':
          case 'input_text_area':
          case 'input_text': {
            let currentValidation: ZodString = z.string();

            if (validation_regex) {
              const regex = new RegExp(validation_regex);
              currentValidation = currentValidation.regex(
                regex,
                `Input must match regex: ${validation_regex}`,
              );
            }

            if (is_required) {
              currentValidation = currentValidation.min(1, {
                message: 'Field is required',
              });
            }

            // @ts-expect-error TODO
            groupSchema[id] = currentValidation;

            break;
          }

          case 'input_checkbox': {
            // @ts-expect-error TODO
            groupSchema[id] = z.boolean();
            break;
          }
        }
      }

      // @ts-expect-error TODO
      schema[group_id] = z.object(groupSchema);
    }

    return z.object(schema);
  }, [appSourceMode]);

  const defaultValues = useMemo(() => {
    if (dynamicConfig) {
      return dynamicConfig;
    }

    const values: Record<string, Record<string, unknown>> = {};

    for (const group of PREDEFINED_CONFIG[appSourceMode].groups) {
      const { group_id, fields } = group;

      const groupValues: Record<string, unknown> = {};

      for (const field of fields) {
        const { id, default_value } = field;

        groupValues[id] = default_value;
      }

      values[group_id] = groupValues;
    }

    return values;
  }, [appSourceMode, dynamicConfig]);

  const { handleSubmit, control } = useForm({
    resolver: zodResolver(generatedSchema),
    defaultValues,
  });

  const handleClickNext = handleSubmit((data) => {
    // @ts-expect-error TODO
    setDynamicConfig(data);
    goToNext();
  });

  return (
    <div className="flex flex-col gap-4">
      {PREDEFINED_CONFIG[appSourceMode].groups.map((group) => {
        const { group_id, group_name, group_desc, group_icon, fields } = group;

        const renderIcon = () => {
          switch (group_icon) {
            case 'terminal':
              return SquareTerminalIcon;

            case 'database':
              return DatabaseIcon;

            case 'settings':
              return SettingsIcon;

            default:
              return undefined;
          }
        };

        return (
          <Sectioned
            key={group_id}
            withinCard
            sectionTitle={group_name}
            sectionDescription={group_desc}
            sectionIcon={renderIcon()}
            classNameContent="flex flex-col gap-3"
          >
            {fields.map((field) => {
              const { id, name, description, type, placeholder, is_required } =
                field;

              return (
                <div key={`${group_id}.${id}`} className="flex flex-col">
                  <DynFormInput
                    control={control}
                    fieldName={`${group_id}.${id}`}
                    formType={type}
                    formLabel={name}
                    formDescription={description}
                    formPlaceholder={placeholder}
                    isRequired={is_required}
                  />
                </div>
              );
            })}
          </Sectioned>
        );
      })}

      <CtaBar
        goToNext={handleClickNext}
        goToPrevious={goToPrevious}
        isNextDisabled={isNextDisabled}
        isPreviousHidden={isPreviousHidden}
      />
    </div>
  );
}
