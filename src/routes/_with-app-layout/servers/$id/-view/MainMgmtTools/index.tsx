import { BoltIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { useFileManagerSidepanel } from '@/features/file-manager-sidepanel';
import { useFilePreviewSidepanel } from '@/features/file-preview-sidepanel';

import IconFileManager from '@/shared/assets/ico-filemanager.svg';
import IconMariaDB from '@/shared/assets/ico-mariadb.svg';
import IconPostgresql from '@/shared/assets/ico-postgresql.svg';
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
    window.location.assign(`/machine/${serverId}/user`);
  };

  const handleClickDBMariaDB = () => {
    window.location.assign(`/machine/${serverId}/installer/database/mariadb`);
  };

  const handleClickDBPostgreSQL = () => {
    window.location.assign(
      `/machine/${serverId}/installer/database/postgresql`,
    );
  };

  return (
    <CardSectionTitled
      placement="main"
      title={t('common.terms.managementTools')}
      icon={BoltIcon}
    >
      <FlexGrid gridItemsMax={4}>
        <QuickLinkItem
          label="File Manager"
          logoUrl={IconFileManager}
          onClick={handleClickFileManager}
        />
        <QuickLinkItem
          label="User Manager"
          logoUrl={IconUserHome}
          onClick={handleClickUserManager}
        />
        <QuickLinkItem
          label="MariaDB"
          logoUrl={IconMariaDB}
          onClick={handleClickDBMariaDB}
        />
        <QuickLinkItem
          label="PostgreSQL"
          logoUrl={IconPostgresql}
          onClick={handleClickDBPostgreSQL}
        />
      </FlexGrid>
    </CardSectionTitled>
  );
}
