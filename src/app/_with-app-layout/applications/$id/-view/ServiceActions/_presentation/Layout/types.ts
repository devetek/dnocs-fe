import type { ReactNode } from 'react';

import type { LucideProps } from 'lucide-react';

export interface ServiceActionsLayoutFrameProps {
  children: ReactNode;
  freeform?: boolean;
}

export interface ServiceActionsLayoutActionProps {
  label: string;
  isDisabled?: boolean;
  icon: (props: LucideProps) => ReactNode;
  onClick: () => void;
}
