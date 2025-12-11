import type { ReactNode } from 'react';

// =============================================================================
//   Wall Centered
// =============================================================================

export interface FailedStateWallCenteredBaseProps {
  classNameWrapper?: string;
  classNameErrorPayload?: string;
  errorPayload?: ReactNode;
  withCard?: boolean;
}

export interface FailedStateWallCenteredProps extends FailedStateWallCenteredBaseProps {
  ctaText?: ReactNode;
  ctaOnClick?: () => void;
}

export interface FailedStateWallCenteredRetryableProps extends FailedStateWallCenteredBaseProps {
  onClickRetry: () => void;
}
