export default function QuickLinkItem(props: Props) {
  const { label, logoUrl, onClick } = props;

  return (
    <button
      className="cursor-pointer flex items-center gap-2"
      onClick={onClick}
    >
      <img className="w-8 h-8" src={logoUrl} alt="Quick Link Logo" />

      <p>{label}</p>
    </button>
  );
}

interface Props {
  logoUrl: string;
  label: string;

  onClick?: () => void;
}
