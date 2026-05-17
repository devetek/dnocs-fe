import { SiGithub } from '@icons-pack/react-simple-icons';

import { useDevetekTranslations } from '@/services/i18n';

import { FreestandingAccordion } from '@/shared/presentation/atoms/FreestandingAccordion';

import { useEmit } from '../../-models/events';
import useIsGithubLoginRequired from '../../-usecases/use-is-github-login-required';
import { AnnouncementsBanner } from '../-presentations';
import type { AnnouncementsBannerTypes } from '../-presentations/AnnouncementsBanner';

export default function Announcements() {
  const isGithubLoginRequired = useIsGithubLoginRequired();

  const emit = useEmit();

  const t = useDevetekTranslations();

  const handleClickLoginGithub = () => {
    emit('@applications::details/actions/github-login');
  };

  const announcement: AnnouncementsBannerTypes.Announcement = {
    id: 'github-login',
    accent: 'warning-dashed',
    icon: SiGithub,
    title: t('page.applicationDetail.githubBanner.title'),
    description: t('page.applicationDetail.githubBanner.subtitle'),
    ctaLabel: t('page.applicationDetail.githubBanner.ctaLabel'),
    ctaOnClick: handleClickLoginGithub,
  };

  return (
    <FreestandingAccordion
      isOpen={
        isGithubLoginRequired.ready && isGithubLoginRequired.loginRequired
      }
    >
      <AnnouncementsBanner announcements={announcement} />
    </FreestandingAccordion>
  );
}
