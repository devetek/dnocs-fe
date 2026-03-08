import { ArrowLeftIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/ButtonV2';

import useDisplayView from '../-lib/use-display-view';
import { useModel } from '../-models';
import { useEmit } from '../-models/events';

import Layout from './-presentation/Layout';
import AuthForm from './AuthForm';
import Footer from './Footer';
import Heading from './Heading';
import MarketingCarousel from './MarketingCarousel';

const ViewFull = () => {
  return (
    <Layout.FullView key="fullview" className="not-xl:hidden">
      <Layout.FullView.AreaMain>
        <Layout.MainWrapperCard>
          <Heading />
          <MarketingCarousel />
          <Footer />
        </Layout.MainWrapperCard>
      </Layout.FullView.AreaMain>

      <Layout.FullView.AreaSide>
        <AuthForm />
      </Layout.FullView.AreaSide>
    </Layout.FullView>
  );
};

const ViewResponsive = () => {
  const { isBot } = useDisplayView();

  const t = useDevetekTranslations();

  const emit = useEmit();

  const { isResponsiveFormVisible } = useModel();

  const handleClicHideForm = () => {
    emit('@landing/responsive/login-form/close');
  };

  return (
    <Layout.Responsive
      className="data-[isbot=false]:xl:hidden"
      data-isbot={isBot}
      showForm={isResponsiveFormVisible}
    >
      <Layout.Responsive.Main>
        <Layout.MainWrapperCard key="responsiveview">
          <Heading />
          <MarketingCarousel />
          <Footer />
        </Layout.MainWrapperCard>
      </Layout.Responsive.Main>

      <Layout.Responsive.Form>
        <AuthForm />

        <Button
          className="mt-8"
          buttonStyle="3d"
          buttonColor="secondary"
          size="sm"
          onClick={handleClicHideForm}
        >
          <ArrowLeftIcon className="size-4" />
          {t('common.actions.back')}
        </Button>
      </Layout.Responsive.Form>
    </Layout.Responsive>
  );
};

export default function LandingView() {
  const { isBot, viewReady, fullView } = useDisplayView();

  if (isBot) {
    return <ViewResponsive />;
  }

  if (!viewReady) {
    return (
      <>
        <ViewFull />
        <ViewResponsive />
      </>
    );
  }

  return fullView ? <ViewFull /> : <ViewResponsive />;
}
