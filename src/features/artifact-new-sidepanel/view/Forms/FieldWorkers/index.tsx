import { useEffect, useState } from 'react';

import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useDebounceValue } from '@/shared/libs/react-hooks/useDebounce';

import { useEmit } from '@/features/artifact-new-sidepanel/model/events';
import { useArtifactNewGeneralModel } from '@/features/artifact-new-sidepanel/model/general';
import { useWorkersModel } from '@/features/artifact-new-sidepanel/model/workers';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { cn } from '@/shared/libs/tailwind/cn';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { Input } from '@/shared/presentation/atoms/Input';
import { Pagination } from '@/shared/presentation/atoms/Pagination';

import {
  FieldLoading,
  createFieldError,
} from '../../_presentation/FieldStates';
import FieldWrapper from '../../_presentation/FieldWrapper';

const [guard, useWorkers] =
  guardedSelects({
    fallbackLoading: FieldLoading,
    fallbackError: createFieldError({
      i18nKey: 'sidepanel.artifactNew.fieldWorker.onError',
      useTryAgain: () => {
        const emit = useEmit();
        return () => emit('#artifact-new-sidepanel/workers-refresh', null);
      },
    }),
  })(
    couple(useWorkersModel, (s) => s.workers),
  );

const WorkersList = guard(() => {
  const { form } = useArtifactNewGeneralModel();

  const servers = useWorkers((s) => s.servers);
  const pagination = useWorkers((s) => s.pagination);

  const setSearchQuery = useWorkersModel((s) => s.search.setQuery);
  const page = useWorkersModel((s) => s.pagination.page);
  const setPage = useWorkersModel((s) => s.pagination.setPage);

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounceValue(search);

  const { field } = useController({
    control: form.control,
    name: 'workerId',
  });

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch]);

  const totalPage = Math.max(1, pagination?.total_page ?? 1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2">
      <Input
        placeholder="Search server..."
        value={search}
        onChange={handleSearch}
        className="h-8 text-sm"
      />

      <div className="flex flex-col gap-1">
        {servers.length === 0 ? (
          <p className="text-xs text-muted-foreground italic py-2 text-center">No servers found</p>
        ) : (
          servers.map((server) => {
            const isSelected = field.value === server.id;
            return (
              <button
                key={server.id}
                type="button"
                onClick={() => field.onChange(server.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md border text-sm transition-colors',
                  isSelected
                    ? 'border-primary bg-primary/5 font-medium'
                    : 'border-border hover:bg-muted/50',
                )}
              >
                {server.hostname}
              </button>
            );
          })
        )}
      </div>

      {totalPage > 1 && (
        <div className="flex justify-end scale-75 origin-right">
          <Pagination
            currentPage={page}
            maxPage={totalPage}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
});

export default function FieldWorkers() {
  const { form } = useArtifactNewGeneralModel();

  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations('sidepanel.artifactNew.fieldWorker');

  return (
    <FieldWrapper fieldTitle={t('title')}>
      <WorkersList />

      <ErrorInline t={tAll} message={form.formState.errors.workerId?.message} />
    </FieldWrapper>
  );
}
