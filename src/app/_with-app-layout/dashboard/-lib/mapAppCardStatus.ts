import type { DTOs } from '@/shared/api';

import type { AppCardProps } from '../-presentation/AppCard/AppCard';

export default function mapAppCardStatus(app: DTOs.ApplicationV1) {
  const { deploys } = app;

  const { installer_status: status } = deploys?.[0] ?? {};

  let statusState: AppCardProps['statusState'];
  let statusMessage: AppCardProps['statusMessage'];

  switch (status) {
    case 'pending':
      statusState = 'pending';
      statusMessage = 'Pending';
      break;

    case 'progress':
      statusState = 'progress';
      statusMessage = 'In Progress';
      break;

    case 'ready':
      statusState = 'check';
      statusMessage = 'Ready';
      break;

    default:
      statusState = 'error';
      statusMessage = 'Needs attention!';
  }

  return {
    statusState,
    statusMessage,
  };
}
