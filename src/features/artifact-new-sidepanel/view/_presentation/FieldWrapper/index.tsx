import type { ReactNode } from 'react';

import { ImportantMarker } from '..';

interface FieldWrapperProps {
  fieldTitle: string;
  notImportant?: boolean;
  children: ReactNode;
}

export default function FieldWrapper(props: FieldWrapperProps) {
  const { children, fieldTitle, notImportant } = props;

  return (
    <div className="flex flex-col gap-1 overflow-hidden">
      <p className="font-bold text-xs text-primary/70">
        {fieldTitle}
        {!notImportant && <ImportantMarker />}
      </p>

      {children}
    </div>
  );
}
