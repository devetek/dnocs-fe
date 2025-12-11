import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import { Spinner } from '@/shared/presentation/atoms/Spinner';

export default function SubmitButton(props: Props) {
  const { className, classNameWrapper, isSubmitting, onClick } = props;

  return (
    <section className={classNameWrapper}>
      <Button
        className={cn('w-full', className)}
        disabled={isSubmitting}
        onClick={onClick}
      >
        {isSubmitting ? (
          <Spinner className="text-white dark:text-black" />
        ) : (
          'Submit'
        )}
      </Button>
    </section>
  );
}

interface Props {
  className?: string;
  classNameWrapper?: string;
  isSubmitting?: boolean;
  onClick?: () => void;
}
