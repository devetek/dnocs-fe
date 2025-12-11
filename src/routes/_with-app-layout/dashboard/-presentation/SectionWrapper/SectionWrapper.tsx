import type { ReactNode } from 'react';

interface Props {
  sectionTitle: string;
  children: ReactNode;
}

export default function SectionWrapper(props: Props) {
  const { sectionTitle, children } = props;

  return (
    <section className="flex flex-col">
      <h6 className="text-primary font-bold relative left-2 mb-2">
        {sectionTitle}
      </h6>

      {children}
    </section>
  );
}
