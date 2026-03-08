import { PencilLineIcon, PlusCircleIcon, ServerIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Input } from '@/shared/presentation/atoms/Input';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import useProgressCta from '../../../-model/progress-cta';
import { useFormStore } from '../../../-model/store/form';
import { useServersStore } from '../../../-model/store/servers';
import { CtaBar } from '../../../-presentation/CtaBar';
import { Sectioned } from '../../../-presentation/Sectioned';
import { SelectionList } from '../../../-presentation/SelectionList';

const SectionAppDetails = () => {
  const t = useDevetekTranslations(
    'page.applicationsCreate.wizard.step2.sectionAppDetails',
  );

  const [
    appName,
    appDomain,
    appProgLang,
    appProgLangVersion,
    appBuildCommand,
    appRunCommand,
    appPort,
    appSourceMode,
    appBundleIdent,
    setAppName,
    setAppDomain,
    setAppProgLang,
    setAppProgLangVersion,
    setAppBuildCommand,
    setAppRunCommand,
    setAppPort,
  ] = useFormStore((s) => [
    s.appName,
    s.appDomain,
    s.appProgLang,
    s.appProgLangVersion,
    s.appBuildCommand,
    s.appRunCommand,
    s.appPort,
    s.appSourceMode,
    s.appSourceBundleIdent,
    s.setAppName,
    s.setAppDomain,
    s.setAppProgLang,
    s.setAppProgLangVersion,
    s.setAppBuildCommand,
    s.setAppRunCommand,
    s.setAppPort,
  ]);

  return (
    <Sectioned
      withinCard
      sectionIcon={PencilLineIcon}
      sectionTitle={t('title')}
      sectionDescription={t('desc')}
    >
      <h6 className="text-sm font-bold">{t('inputAppName')}</h6>
      <Input
        className="w-full"
        placeholder={t('inputAppNamePlaceholder')}
        value={appName}
        onChange={(e) => {
          setAppName(e.target.value);
        }}
      />

      {appBundleIdent === 'wordpress' && (
        <>
          <h6 className="mt-4 text-sm font-bold">{t('inputDomain')}</h6>
          <Input
            className="w-full"
            placeholder={t('inputDomainPlaceholder')}
            value={appDomain}
            onChange={(e) => {
              setAppDomain(e.target.value);
            }}
          />
        </>
      )}

      {appSourceMode !== 'bundle' && (
        <>
          <>
            <h6 className="mt-4 text-sm font-bold">{t('inputProgLang')}</h6>
            <Combobox
              classNameButton="w-full"
              placeholder={t('inputProgLangPlaceholder')}
              items={[
                {
                  label: 'Golang',
                  value: 'go',
                },
                {
                  label: 'Python',
                  value: 'python',
                },
                {
                  label: 'PHP',
                  value: 'php',
                },
                {
                  label: 'Ruby',
                  value: 'ruby',
                },
                {
                  label: 'NodeJS',
                  value: 'nodejs',
                },
                {
                  label: 'Bun',
                  value: 'bun',
                },
                {
                  label: 'Docker',
                  value: 'docker',
                },
              ]}
              onChange={(value) => {
                setAppProgLang(value);
              }}
              value={appProgLang}
            />

            <h6 className="mt-4 text-sm font-bold">
              {t('inputProgLangVersion')}
            </h6>
            <Input
              className="w-full"
              placeholder={t('inputProgLangVersionPlaceholder')}
              value={appProgLangVersion}
              onChange={(e) => {
                setAppProgLangVersion(e.target.value);
              }}
            />

            <h6 className="mt-4 text-sm font-bold">{t('inputBuildCommand')}</h6>
            <Input
              className="w-full"
              placeholder={t('inputBuildCommandPlaceholder')}
              value={appBuildCommand}
              onChange={(e) => {
                setAppBuildCommand(e.target.value);
              }}
            />

            <h6 className="mt-4 text-sm font-bold">{t('inputRunCommand')}</h6>
            <Input
              className="w-full"
              placeholder={t('inputRunCommandPlaceholder')}
              value={appRunCommand}
              onChange={(e) => {
                setAppRunCommand(e.target.value);
              }}
            />
          </>

          <h6 className="mt-4 text-sm font-bold">{t('inputPort')}</h6>
          <Input
            className="w-full"
            placeholder={t('inputPortPlaceholder')}
            value={appPort}
            onChange={(e) => {
              setAppPort(e.target.value);
            }}
          />
        </>
      )}
    </Sectioned>
  );
};

const SectionServer = () => {
  const t = useDevetekTranslations(
    'page.applicationsCreate.wizard.step2.sectionSelectServer',
  );

  const [serversStore] = useServersStore();

  const [hostedServerID, setHostedServerID] = useFormStore((s) => [
    s.hostedServerID,
    s.setHostedServerID,
  ]);

  const handleClickAddNewServer = () => {
    window.open('/servers/create', '_blank')?.focus();
  };

  let serverList = <Spinner />;

  if (serversStore.$status === 'success') {
    serverList = (
      <SelectionList<number>
        items={serversStore.servers.map((server) => {
          const { hostname, id, publicIP } = server;

          return {
            id,
            title: hostname,
            desc: publicIP,
          };
        })}
        onClickItem={(id) => {
          setHostedServerID(id);
        }}
        selectedId={hostedServerID}
      />
    );
  }

  return (
    <Sectioned
      withinCard
      sectionIcon={ServerIcon}
      sectionTitle={t('title')}
      sectionDescription={t('desc')}
      append={
        <div className="mt-2 flex">
          <Button variant="outline" onClick={handleClickAddNewServer}>
            <PlusCircleIcon className="w-4 h-4" />
            {t('btnAddNewServer')}
          </Button>
        </div>
      }
    >
      {serverList}
    </Sectioned>
  );
};

export default function Step2Details() {
  const { goToNext, goToPrevious, isPreviousHidden, isNextDisabled } =
    useProgressCta();

  return (
    <div className="flex flex-col gap-4">
      <SectionAppDetails />
      <SectionServer />

      <CtaBar
        goToNext={goToNext}
        goToPrevious={goToPrevious}
        isNextDisabled={isNextDisabled}
        isPreviousHidden={isPreviousHidden}
      />
    </div>
  );
}
