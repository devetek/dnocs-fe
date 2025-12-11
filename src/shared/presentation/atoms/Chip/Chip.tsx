import { cn } from '@/shared/libs/tailwind/cn';

export default function Chip(props: Props) {
  const { label, logoUrl, isActive, onClick } = props;

  const cnRoot = cn(
    'cursor-pointer px-3 py-1 border rounded-2xl flex items-center gap-1',
    {
      'border-blue-500': isActive,
    },
  );

  return (
    <button className={cnRoot} onClick={onClick}>
      {logoUrl && (
        <div className="h-4 w-4 flex items-center justify-center">
          <img className="object-fill" src={logoUrl} alt="Chip Logo" />
        </div>
      )}

      <p>{label}</p>
    </button>
  );
}

interface Props {
  label: string;
  logoUrl?: string;
  isActive?: boolean;

  onClick?: () => void;
}
