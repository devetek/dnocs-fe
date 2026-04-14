import { SiGithub } from '@icons-pack/react-simple-icons';
import { BoxIcon, CodeIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { PREDEFINED_BUNDLES } from '@/entities/app-bundle/config/predefined';

import { Card } from '@/shared/presentation/atoms/Card';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';

import useProgressCta from '../../../-model/progress-cta';
import { useFormStore } from '../../../-model/store/form';
import { CtaBar } from '../../../-presentation/CtaBar';
import { Sectioned } from '../../../-presentation/Sectioned';

import { ButtonSource } from './_presentation/ButtonSource';
import { CardBundle } from './_presentation/CardBundle';
import { SectionSourceGithub } from './SectionSourceGithub';

const SectionSelectSourceType = () => {
  const t = useDevetekTranslations(
    'page.applicationsCreate.wizard.step1.sectionSelectSource',
  );

  const [appSourceMode, setAppSourceMode] = useFormStore((s) => [
    s.appSourceMode,
    s.setAppSourceMode,
  ]);

  return (
    <Sectioned
      withinCard
      sectionIcon={CodeIcon}
      sectionTitle={t('title')}
      sectionDescription={t('desc')}
    >
      <div className="flex flex-col gap-4">
        <ButtonSource
          icon={BoxIcon}
          title={t('appBundle.title')}
          desc={t('appBundle.desc')}
          checked={appSourceMode === 'bundle'}
          onClick={() => {
            setAppSourceMode('bundle');
          }}
        />
        <ButtonSource
          icon={SiGithub}
          title={t('ghRepo.title')}
          desc={t('ghRepo.desc')}
          checked={appSourceMode === 'github'}
          onClick={() => {
            setAppSourceMode('github');
          }}
        />
      </div>
    </Sectioned>
  );
};

const SectionSourceAppBundle = () => {
  const t = useDevetekTranslations(
    'page.applicationsCreate.wizard.step1.sectionSelectAppBundle',
  );

  const [appSourceBundleIdent, setAppSourceBundleIdent] = useFormStore((s) => [
    s.appSourceBundleIdent,
    s.setAppSourceBundleIdent,
  ]);

  return (
    <Card className="rounded-2xl shadow-none px-5 py-6">
      <h3 className="text-xl font-bold mb-4">{t('title')}</h3>
      <FlexGrid gridItemsMax={3}>
        {PREDEFINED_BUNDLES.map((bundle) => {
          const { id, name, description, iconURL } = bundle;

          return (
            <CardBundle
              key={id}
              iconURL={iconURL}
              title={name}
              desc={description}
              checked={appSourceBundleIdent === id}
              onClick={() => {
                setAppSourceBundleIdent(id);
              }}
            />
          );
        })}
      </FlexGrid>
    </Card>
  );
};

export default function Step1Source() {
  const [appSourceMode] = useFormStore((s) => [s.appSourceMode]);
  const { goToNext, goToPrevious, isPreviousHidden, isNextDisabled } =
    useProgressCta();

  return (
    <div className="flex flex-col gap-4">
      <SectionSelectSourceType />

      {appSourceMode === 'bundle' && <SectionSourceAppBundle />}
      {appSourceMode === 'github' && <SectionSourceGithub />}

      <CtaBar
        goToNext={goToNext}
        goToPrevious={goToPrevious}
        isNextDisabled={isNextDisabled}
        isPreviousHidden={isPreviousHidden}
      />
    </div>
  );
}
