import { useAuthLoggedIn } from '@/services/auth';

import {
  ApiApplication,
  ApiCloud,
  ApiSecret,
  ApiServer,
} from '@/shared/api';

import QuickStats from '../../-presentation/QuickStats/QuickStats';

export default function QuickStatsView() {
  const userId = useAuthLoggedIn().userProfile.id;

  const [resServers] = ApiServer.Find.useGet({
    pageSize: 1,
  });

  const [resApps] = ApiApplication.Find.useGet({
    page: 1,
    limit: 1,
  });

  const [resSsh] = ApiSecret.SshKey.Find.useGet({
    userId,
    pageSize: 1,
  });

  const [resCloud] = ApiCloud.Project.Find.useGet({
    userId,
    pageSize: 1,
  });

  const serverCount =
    resServers.$status === 'success'
      ? (resServers.pagination?.total_item ?? resServers.machines?.length ?? 0)
      : undefined;

  const appCount =
    resApps.$status === 'success'
      ? (resApps.pagination?.total_item ?? resApps.applications?.length ?? 0)
      : undefined;

  const sshKeyCount =
    resSsh.$status === 'success'
      ? (resSsh.pagination?.total_item ?? resSsh.secrets?.length ?? 0)
      : undefined;

  const cloudCount =
    resCloud.$status === 'success'
      ? (resCloud.pagination?.total_item ?? resCloud.clouds?.length ?? 0)
      : undefined;

  return (
    <QuickStats
      serverCount={serverCount}
      appCount={appCount}
      sshKeyCount={sshKeyCount}
      cloudCount={cloudCount}
    />
  );
}
