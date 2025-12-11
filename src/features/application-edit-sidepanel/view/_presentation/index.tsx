import { LoaderCircleIcon } from 'lucide-react';

import { useEmit } from '../../model/events';

export const ImportantMarker = () => (
  <span className="font-bold text-red-500">*</span>
);

export const GitBranchError = () => {
  const emit = useEmit();

  const handleClickTryAgain = () => {
    emit('#application-edit-sidepanel/git-branch-refresh', null);
  };

  return (
    <div className="bg-red-500/5 py-1 px-2 rounded-lg">
      <p className="text-sm italic opacity-70">
        Failed to fetch git branch, please{' '}
        <a
          className="underline cursor-default hover:text-blue-500"
          onClick={handleClickTryAgain}
        >
          try again.
        </a>
      </p>
    </div>
  );
};

export const GitBranchLoading = () => {
  return <LoaderCircleIcon className="animate-spin" />;
};
