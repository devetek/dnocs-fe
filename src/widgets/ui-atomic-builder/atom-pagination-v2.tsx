import { useDevetekTranslations } from '@/services/i18n';

import PaginationV2 from '@/shared/presentation/atoms/PaginationV2';
import type { RenderPageInfo } from '@/shared/presentation/atoms/PaginationV2/types';

import type {
  BuildPaginationV2Params,
  PaginationV2DerivedProps,
} from './atom-pagination-v2.types';

export function buildPaginationV2(params: BuildPaginationV2Params) {
  const { customRenderPageInfo } = params;

  const RenderPageInfoComponent: RenderPageInfo = (props) => {
    const { currentPage, totalPage } = props;

    const t = useDevetekTranslations();

    if (!customRenderPageInfo) {
      return t('common.terms.xOfY', {
        0: currentPage,
        1: totalPage,
      });
    }

    if (customRenderPageInfo.type === 'i18n') {
      return t(customRenderPageInfo.key, {
        0: currentPage,
        1: totalPage,
      });
    }

    if (customRenderPageInfo.type === 'custom') {
      const Component = customRenderPageInfo.component;

      return <Component {...props} />;
    }

    return <></>;
  };

  return function PaginationV2Derived(props: PaginationV2DerivedProps) {
    return <PaginationV2 {...props} renderPageInfo={RenderPageInfoComponent} />;
  };
}
