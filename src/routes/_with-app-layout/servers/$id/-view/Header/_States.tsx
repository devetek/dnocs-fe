import { PageHeaderShimmer } from '@/shared/presentation/organisms/PageHeader';

function Loading() {
  return <PageHeaderShimmer hasHeadnote hasRightAppend hasStatuses />;
}

export const HeaderStates = {
  Loading,
};
