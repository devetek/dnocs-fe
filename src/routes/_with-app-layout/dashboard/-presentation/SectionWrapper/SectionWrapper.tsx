import type { ReactNode } from 'react';

interface Props {
  sectionTitle: string;
  count?: number;
  children: ReactNode;
}

export default function SectionWrapper(props: Props) {
  const { sectionTitle, count, children } = props;

  return (
    <section className="flex flex-col">
      <h6 className="text-primary font-bold relative left-2 mb-2 flex items-center gap-2">
        {sectionTitle}
        {count !== undefined && (
          <span className="text-xs font-normal text-primary/50 tabular-nums">
            ({count})
          </span>
        )}
      </h6>

      {children}
    </section>
  );
}
