import { cn } from '@/shared/libs/tailwind/cn';

interface ErrorInlineProps {
  className?: string;
  message?: string | null;
  t?: (key: string) => string;
}

export default function ErrorInline(props: ErrorInlineProps) {
  const { className, message, t } = props;

  if (!message) return null;

  const cnRoot = cn(
    'mt-0.5 break-words text-xs font-medium text-red-500',
    className,
  );

  return (
    <p role="alert" className={cnRoot}>
      {t ? t(message) : message}
    </p>
  );
}
