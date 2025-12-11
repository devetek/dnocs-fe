import { useMemo } from 'react';

import { useController } from 'react-hook-form';

import { useDevetekTranslations } from '@/services/i18n';

import { useEmit } from '@/features/artifact-new-sidepanel/model/events';
import { useArtifactNewGeneralModel } from '@/features/artifact-new-sidepanel/model/general';
import { useWorkersModel } from '@/features/artifact-new-sidepanel/model/workers';

import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import { ComboboxWithSearch } from '@/shared/presentation/molecules/ComboboxWithSearch';

import {
  FieldLoading,
  createFieldError,
} from '../../_presentation/FieldStates';
import FieldWrapper from '../../_presentation/FieldWrapper';

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

const WorkersCbo = guard(() => {
  const { form } = useArtifactNewGeneralModel();

  const t = useDevetekTranslations();

  const workersMine = useWorkersMine((s) => s.servers);
  const workersSharedWithMe = useWorkersSharedWithMe((s) => s.servers);
  const workersTeam = useWorkersTeam((s) => s.servers);

  const items = useMemo(() => {
    const servers = [
      ...workersMine,
      ...workersSharedWithMe,
      ...workersTeam,
    ].map((worker) => {
      const { id, hostname } = worker;

      return {
        label: hostname,
        value: id,
      };
    });

    const setServers: typeof servers = [];

    for (const server of servers) {
      if (!setServers.find((setServer) => server.value === setServer.value)) {
        setServers.push(server);
      }
    }

    return setServers;
  }, [workersMine, workersSharedWithMe, workersTeam]);

  const { field } = useController({
    control: form.control,
    name: 'workerId',
  });

  return (
    <ComboboxWithSearch
      classNameButton="w-full"
      value={field.value}
      onChange={field.onChange}
      items={items}
      placeholder={t('common.terms.selectWorker')}
    />
  );
});

export default function FieldWorkers() {
  const { form } = useArtifactNewGeneralModel();

  const tAll = useDevetekTranslations();
  const t = useDevetekTranslations('sidepanel.artifactNew.fieldWorker');

  return (
    <FieldWrapper fieldTitle={t('title')}>
      <WorkersCbo />

      <ErrorInline t={tAll} message={form.formState.errors.workerId?.message} />
    </FieldWrapper>
  );
}
