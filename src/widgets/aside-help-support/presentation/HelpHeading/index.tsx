import { HelpCircleIcon } from 'lucide-react';

interface HelpHeadingProps {
  title: string;
  description: string;
}

export default function HelpHeading(props: HelpHeadingProps) {
  const { title, description } = props;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2 items-center">
        <HelpCircleIcon className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
}
