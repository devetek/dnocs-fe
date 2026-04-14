import { ClockIcon, CreditCardIcon, HomeIcon, UserIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import IconMariaDB from '@/shared/assets/ico-mariadb.svg';
import IconPostgreSQL from '@/shared/assets/ico-postgresql.svg';
import { Card } from '@/shared/presentation/atoms/Card';

import TemplateCardCta from '../Templates/CardCta';
import TemplateCardInfo from '../Templates/CardInfo';

export default function UserInfoCard(props: UserInfoCardProps) {
  const {
    userName,
    userId,
    dbEngine,
    hostAddress,
    lastUpdated,
    userAccess,
    onClickGrant,
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
    {
      icon: <CreditCardIcon width={16} height={16} />,
      iconTooltip: 'Access',
      text: userAccess,
    },
  ];

  return (
    <Card>
      <TemplateCardInfo
        title={userName}
        subtitle={
          <code>
            user_id:
            <span className="whitespace-nowrap">{userId}</span>
          </code>
        }
        logoAreaMain={<img className="size-12" src={logoSrc} alt="DB Logo" />}
        logoAreaMainTooltip={imgTooltip}
        logoAreaSub={<UserIcon width={24} height={24} />}
        additionalInfos={additionals}
      />

      <TemplateCardCta
        mainText={t('common.actions.grant')}
        mainOnClick={onClickGrant}
        additionals={[
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

export interface UserInfoCardProps {
  dbEngine: 'mariadb' | 'postgresql';
  userId: number;
  userName: string;
  userAccess: string;
  hostAddress: string;
  lastUpdated: string;

  onClickGrant?: () => void;
  onClickDelete?: () => void;
}
