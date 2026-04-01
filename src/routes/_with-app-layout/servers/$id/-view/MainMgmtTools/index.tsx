import { BoltIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { useFileManagerSidepanel } from '@/features/file-manager-sidepanel';
import { useFilePreviewSidepanel } from '@/features/file-preview-sidepanel';
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

  const handleClickSSH = () => {
    window.open(`${import.meta.env.VITE_SECURE_SHELL_HOST}?id=${serverId}`, '_blank');
  };

  return (
    <CardSectionTitled
      placement="main"
      title={t('common.terms.managementTools')}
      icon={BoltIcon}
    >
      <FlexGrid gridItemsMax={4}>
        <QuickLinkItem
          label="Files"
          logoUrl={IconFileManager}
          onClick={handleClickFileManager}
        />
        <QuickLinkItem
          label="Users"
          logoUrl={IconUserHome}
          onClick={handleClickUserManager}
        />
        <QuickLinkItem
          label="SSH"
          logoUrl={IconSSH}
          onClick={handleClickSSH}
        />
      </FlexGrid>
    </CardSectionTitled>
  );
}
