import { SearchIcon, XIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

interface Props {
  keyword?: string | null;
  onClear: () => void;
}

export default function SearchKeywordBadge(props: Props) {
  const { keyword, onClear } = props;

  const t = useDevetekTranslations();

  if (!keyword) return null;

  return (
    <div className="flex items-center gap-x-1.5 px-2 py-1 rounded-md bg-primary/5 border border-primary/10 max-w-fit overflow-hidden">
      <SearchIcon className="size-3 text-primary/50 shrink-0" />
      <span className="text-[0.7rem] text-primary/60">
        {t('common.terms.searchResultsFor')}
      </span>
      <span className="text-[0.7rem] text-primary/70 font-medium italic truncate max-w-[180px] sm:max-w-xs">
        &ldquo;{keyword}&rdquo;
      </span>
      <button
        type="button"
        onClick={onClear}
        className="flex items-center justify-center size-4 rounded text-primary/40 hover:text-primary/80 transition-colors shrink-0"
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
}
