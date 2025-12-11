import { Button } from '../../atoms/Button';

interface Props {
  title: string;
  message?: string;
  ctaText?: string;
  ctaOnClick?: () => void;
}

export default function EmptyState(props: Props) {
  const { title, message, ctaText, ctaOnClick } = props;

  return (
    <div className="my-8 flex flex-col items-center">
      <p className="text-8xl">🙇</p>
      <h3 className="mt-3 text-center text-xl font-bold text-primary">
        {title}
      </h3>
      <p className="mb-4 text-center">{message}</p>

      <Button disabled={!ctaOnClick} onClick={ctaOnClick}>
        {ctaText}
      </Button>
    </div>
  );
}
