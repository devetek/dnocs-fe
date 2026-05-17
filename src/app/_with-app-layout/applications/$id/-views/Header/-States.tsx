import { PageHeaderShimmer } from '@/shared/presentation/organisms/PageHeader';

const Loading = PageHeaderShimmer.build({
  hasHeadnote: true,
  hasFootnote: true,
  hasRightAppend: true,
  hasStatuses: true,
});

export const HEADER_STATES = {
  loading: Loading,
  error: Loading,
};
