import { WarehouseIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Card } from '@/shared/presentation/atoms/Card';

import useHandleDeploy from '../../../-model/handle-deploy';
import useProgressCta from '../../../-model/progress-cta';
import { useFormStore } from '../../../-model/store/form';
import { useServersStore } from '../../../-model/store/servers';
import CtaBar from '../../../-presentation/CtaBar/CtaBar';
import { Sectioned } from '../../../-presentation/Sectioned';

import { DynamicVarTable } from './DynamicVarTable';

const DeploymentSummary = () => {
  const t = useDevetekTranslations(
    'page.applicationsCreate.wizard.step4.sectionDeploySummary',
  );

  const [
    appName,
    appBuildCommand,
    appRunCommand,
    appPort,
    appDomain,
    hostedServerID,
  ] = useFormStore((s) => [
    s.appName,
    s.appBuildCommand,
    s.appRunCommand,
    s.appPort,
    s.appDomain,
    s.hostedServerID,
  ]);

  const [serversStore] = useServersStore();

  const selectedServer =
    serversStore.$status === 'success'
      ? serversStore.servers.find((s) => s.id === hostedServerID)
      : null;

  return (
    <Sectioned
      withinCard
      sectionTitle={t('title')}
      sectionDescription={t('desc')}
      sectionIcon={WarehouseIcon}
    >
      <div className="h-full border rounded-lg p-2 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-bold">Application Name</p>
          <p className="text-sm">{appName}</p>
        </div>

        {appDomain !== '' && (
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold">Domain</p>
            <p className="text-sm">{appDomain}</p>
          </div>
        )}

        {appPort !== '' && (
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold">Port</p>
            <p className="text-sm">{appPort}</p>
          </div>
        )}

        {appBuildCommand.length > 0 && (
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold">Build</p>
            <p className="text-sm">{appBuildCommand}</p>
          </div>
        )}

        {appRunCommand !== '' && (
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-bold">Run</p>
            <p className="text-sm">{appRunCommand}</p>
          </div>
        )}

        <div className="flex flex-col gap-0.5">
          <p className="text-xs font-bold">Selected Server</p>
          <p className="text-sm">{selectedServer?.hostname || '-'}</p>
        </div>
      </div>
    </Sectioned>
  );
};

const DynamicVariables = () => {
  const [dynamicConfig, appSourceMode] = useFormStore((s) => [
    s.dynamicConfig,
    s.appSourceMode,
  ]);

  if (!dynamicConfig) return null;

  return (
    <Card className="rounded-2xl shadow-none px-5 py-6 overflow-hidden overflow-x-auto">
      <h3 className="text-xl font-bold mb-4">Dynamic Variables</h3>

      <DynamicVarTable
        appSourceMode={appSourceMode}
        dynamicConfig={dynamicConfig}
      />

      {/* <h6 className="text-md font-medium">Database Configuration</h6> */}
    </Card>
  );
};

export default function Step4Deploy() {
  const { goToPrevious, isPreviousHidden } = useProgressCta();
  const { handleDeploy } = useHandleDeploy();

  return (
    <div className="flex flex-col gap-4 overflow-hidden">
      <DeploymentSummary />
      <DynamicVariables />

      <CtaBar
        goToNext={handleDeploy}
        goToPrevious={goToPrevious}
        isPreviousHidden={isPreviousHidden}
        labelNext="Deploy"
      />
    </div>
  );
}
