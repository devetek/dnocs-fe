import { Card } from '@/shared/presentation/atoms/Card';
import { FailedState } from '@/widgets/failed-state';

import type { CardWrapperProps, EmptyStateProps } from './types';

const CardWrapper = (props: CardWrapperProps) => {
  const { children } = props;

  return (
    <Card className="shadow-none p-2 flex items-center justify-center">
      {children}
    </Card>
  );
};

export default function EmptyState(props: EmptyStateProps) {
  const { state } = props;

  switch (state) {
    case 'empty-artifact':
      return (
        <CardWrapper>
          <em className="text-primary/50">No Artifacts available.</em>
        </CardWrapper>
      );

    case 'not-eligible':
      return (
        <CardWrapper>
          <em className="text-primary/50">
            Artifacts are not supported for this app.
          </em>
        </CardWrapper>
      );

    case 'error':
      return (
        <CardWrapper>
          <FailedState.WallCentered />
        </CardWrapper>
      );

    default:
      return null;
  }
}
