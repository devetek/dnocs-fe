import { SiGithub } from '@icons-pack/react-simple-icons';

import { useAuthLoggedIn } from '@/services/auth';
import { useDevetekTranslations } from '@/services/i18n';

import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';

import { useAppDataModel } from '../../-model/app-data';
import { useEmit } from '../../-model/events';

export default function BannerGithubLogin() {
  const { gitProfile } = useAuthLoggedIn();

  const emit = useEmit();

  const t = useDevetekTranslations();

  const [appDetail] = useAppDataModel((s) => [s.appDetail, s.applicationId]);

  if (
    gitProfile ||
    appDetail.$status !== 'success' ||
    appDetail.identity.source !== 'repository'
  )
    return null;

  const handleClickLoginGithub = () => {
    emit('@applications::detail/github-login', null);
  };

  return (
    <Card className="rounded-2xl border-2 border-dashed border-yellow-500">
      <div className="p-4 grid grid-cols-[auto_1fr] gap-x-4">
        <SiGithub className="w-10 h-10" />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">
              {t('page.applicationDetail.githubBanner.title')}
            </h3>
            <h5 className="text-sm">
              {t('page.applicationDetail.githubBanner.subtitle')}
            </h5>
          </div>

          <Button className="w-max" onClick={handleClickLoginGithub}>
            Login Github
          </Button>
        </div>
      </div>
    </Card>
  );
}
