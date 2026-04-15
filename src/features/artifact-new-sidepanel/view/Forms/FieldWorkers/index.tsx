import { useMemo, useState } from 'react';

import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

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

const PER_PAGE = 3;

const [guard, useWorkersMine, useWorkersSharedWithMe, useWorkersTeam] =
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
    couple(useWorkersModel, (s) => s.workersMine),
    couple(useWorkersModel, (s) => s.workersSharedWithMe),
    couple(useWorkersModel, (s) => s.workersTeam),
  );

const WorkersList = guard(() => {
  const { form } = useArtifactNewGeneralModel();

  const workersMine = useWorkersMine((s) => s.servers);
  const workersSharedWithMe = useWorkersSharedWithMe((s) => s.servers);
  const workersTeam = useWorkersTeam((s) => s.servers);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { field } = useController({
    control: form.control,
    name: 'workerId',
  });

  const allItems = useMemo(() => {
    const servers = [
      ...workersMine,
      ...workersSharedWithMe,
      ...workersTeam,
    ];

    const seen = new Set<string>();
    return servers.filter((s) => {
      if (seen.has(s.id)) return false;
      seen.add(s.id);
      return true;
    });
  }, [workersMine, workersSharedWithMe, workersTeam]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return q ? allItems.filter((s) => s.hostname.toLowerCase().includes(q)) : allItems;
  }, [allItems, search]);

  const totalPage = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPage);
  const paged = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
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
        {paged.length === 0 ? (
          <p className="text-xs text-muted-foreground italic py-2 text-center">No servers found</p>
        ) : (
          paged.map((server) => {
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
        <Pagination
          currentPage={safePage}
          maxPage={totalPage}
          onPageChange={setPage}
        />
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
