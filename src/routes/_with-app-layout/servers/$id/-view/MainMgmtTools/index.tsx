import {
  ActivityIcon,
  BoltIcon,
  GlobeIcon,
  ScrollTextIcon,
  ShieldIcon,
} from 'lucide-react';

import { useToaster } from '@/services/toaster';
import { useDevetekTranslations } from '@/services/i18n';

import { useFileManagerSidepanel } from '@/features/file-manager-sidepanel';
import { useFilePreviewSidepanel } from '@/features/file-preview-sidepanel';
import { useServerLogViewerSidepanel } from '@/features/server-log-viewer-sidepanel';
import { useServerNetworksSidepanel } from '@/features/server-networks-sidepanel';
import { useServerServicesSidepanel } from '@/features/server-services-sidepanel';
import { useServerUsersSidepanel } from '@/features/server-users-sidepanel';

import IconFileManager from '@/shared/assets/ico-filemanager.svg';
import IconSSH from '@/shared/assets/ico-ssh.svg';
import IconUserHome from '@/shared/assets/ico-userhome.svg';
import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import { useServerDataModel } from '../../-model/server-data';
import QuickLinkItem from '../_presentation/QuickLinkItem';

export default function MainMgmtTools() {
  const [serverId, serverDetail] = useServerDataModel((s) => [
    s.serverId,
    s.detail,
  ]);

  const [openFileManagerSidepanel] = useFileManagerSidepanel();
  const [openFilePreviewSidepanel] = useFilePreviewSidepanel();
  const [openServerUsersSidepanel] = useServerUsersSidepanel();
  const [openServerNetworksSidepanel] = useServerNetworksSidepanel();
  const [openServerServicesSidepanel] = useServerServicesSidepanel();
  const [openServerLogViewerSidepanel] = useServerLogViewerSidepanel();
  const [pushToast] = useToaster();

  const t = useDevetekTranslations();

  const handleClickFileManager = () => {
    if (serverDetail.$status !== 'success') return;

    openFileManagerSidepanel({
      serverId,
      onPreviewFile: (fullPath, selectedFile) => {
        openFilePreviewSidepanel({
          $mode: 'push',
          selectedFileFullPath: fullPath,
          selectedFile,
          serverId,
        });
      },
    });
  };

  const handleClickUserManager = () => {
    if (serverDetail.$status !== 'success') return;

    openServerUsersSidepanel({
      serverId,
      serverName: serverDetail.host.name,
    });
  };

  const handleClickNetworks = () => {
    openServerNetworksSidepanel({
      serverId,
      serverName: serverDetail.$status === 'success' ? serverDetail.host.name : undefined,
    });
  };

  const handleClickSSH = () => {
    window.open(`${import.meta.env.VITE_SECURE_SHELL_HOST}?id=${serverId}`, '_blank');
  };

  const handleUnderDevelopment = (featureName: string) => () => {
    pushToast({
      variant: 'info',
      title: 'Under Development',
      message: `Fitur ${featureName} sedang dalam pengembangan.`,
      duration: 3000,
    });
  };

  return (
    <CardSectionTitled
      placement="main"
      title={t('common.terms.managementTools')}
      icon={BoltIcon}
    >
      <FlexGrid gridItemsMax={4}>
        <QuickLinkItem
          label="Services"
          icon={ActivityIcon}
          onClick={() =>
            openServerServicesSidepanel({
              serverId,
              serverName: serverDetail.$status === 'success' ? serverDetail.host.name : undefined,
            })
          }
        />
        <QuickLinkItem
          label="File Manager"
          logoUrl={IconFileManager}
          onClick={handleClickFileManager}
        />
        <QuickLinkItem
          label="Users"
          logoUrl={IconUserHome}
          onClick={handleClickUserManager}
        />
        <QuickLinkItem
          label="SSH Terminal"
          logoUrl={IconSSH}
          onClick={handleClickSSH}
        />
        <QuickLinkItem
          label="Firewall"
          icon={ShieldIcon}
          onClick={handleUnderDevelopment('Firewall')}
        />
        <QuickLinkItem
          label="Networks"
          icon={GlobeIcon}
          onClick={handleClickNetworks}
        />
        <QuickLinkItem
          label="Log Viewer"
          icon={ScrollTextIcon}
          onClick={() =>
            openServerLogViewerSidepanel({
              serverId,
              serverName: serverDetail.$status === 'success' ? serverDetail.host.name : undefined,
            })
          }
        />
      </FlexGrid>
    </CardSectionTitled>
  );
}
