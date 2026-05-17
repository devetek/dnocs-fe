import { CicdCard } from '../-presentations';

function LoadingState() {
  return (
    <div className="p-3 flex flex-col gap-y-2">
      <CicdCard.Placeholder />
      <CicdCard.Placeholder />
      <CicdCard.Placeholder />
    </div>
  );
}

export const DEPLOYMENT_STATES = {
  loading: LoadingState,
  error: LoadingState,
};

export const ARTIFACT_STATES = {
  loading: LoadingState,
  error: LoadingState,
};
