import { ClockIcon, DatabaseIcon, HomeIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import IconMariaDB from '@/shared/assets/ico-mariadb.svg';
import IconPostgreSQL from '@/shared/assets/ico-postgresql.svg';
import { Card } from '@/shared/presentation/atoms/Card';

import TemplateCardCta from '../Templates/CardCta';
import TemplateCardInfo from '../Templates/CardInfo';

export default function DbInfoCard(props: DbInfoCardProps) {
  const {
    dbId,
    dbTitle,
    dbEngine,
    hostAddress,
    lastUpdated,
    onClickDetails,
    onClickHostInfo,
    onClickDelete,
  } = props;

  const t = useDevetekTranslations();

  let imgTooltip = 'Unknown Engine';
  let logoSrc = '';

  switch (dbEngine) {
    case 'postgresql':
      imgTooltip = 'PostgreSQL';
      logoSrc = IconPostgreSQL;
      break;

    case 'mariadb':
      imgTooltip = 'MariaDB';
      logoSrc = IconMariaDB;
      break;
  }

  const additionals = [
    {
      icon: <ClockIcon width={16} height={16} />,
      iconTooltip: 'Last updated',
      text: lastUpdated,
    },
    {
      icon: <HomeIcon width={16} height={16} />,
      iconTooltip: 'Host Address',
      text: hostAddress,
    },
  ];

  return (
    <Card>
      <TemplateCardInfo
        title={dbTitle}
        subtitle={
          <code>
            db_id:
            <span className="whitespace-nowrap">{dbId}</span>
          </code>
        }
        logoAreaMain={<img className="size-12" src={logoSrc} alt="DB Logo" />}
        logoAreaMainTooltip={imgTooltip}
        logoAreaSub={<DatabaseIcon width={24} height={24} />}
        additionalInfos={additionals}
      />

      <TemplateCardCta
        mainText={t('common.actions.details')}
        mainOnClick={onClickDetails}
        additionals={[
          {
            text: 'Host Info',
            onClick: onClickHostInfo,
          },
          {
            text: t('common.actions.delete'),
            className: 'text-red-500',
            onClick: onClickDelete,
          },
        ]}
      />
    </Card>
  );
}

export interface DbInfoCardProps {
  dbTitle: string;
  dbId: number;
  dbEngine: 'mariadb' | 'postgresql';
  hostAddress: string;
  lastUpdated: string;

  onClickDetails?: () => void;
  onClickHostInfo?: () => void;
  onClickDelete?: () => void;
}
