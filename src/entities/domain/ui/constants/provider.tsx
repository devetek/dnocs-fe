import type { LucideProps } from 'lucide-react';
import { CircleQuestionMarkIcon } from 'lucide-react';

import { cn } from '@/shared/libs/tailwind/cn';
import IconBrandCloudflare from '@/shared/presentation/icons/BrandCloudflare';
import IconBrandDigitalOcean from '@/shared/presentation/icons/BrandDigitalOcean';

import { SchemaDomainParts } from '../../rules/schema';
import type { DomainProvider } from '../../rules/types';

const UnknownIcon = (props: LucideProps) => {
  const cnIcon = cn('opacity-10 text-primary', props.className);

  return <CircleQuestionMarkIcon {...props} className={cnIcon} />;
};

export const DOMAIN_PROVIDER_BRANDS: Record<
  SchemaDomainParts.Provider,
  DomainProvider
> = {
  [SchemaDomainParts.ProviderIdent.cloudflare]: {
    icon: IconBrandCloudflare,
    i18n: {
      brandName: 'common.terms.unknown',
    },
  },
  [SchemaDomainParts.ProviderIdent.digitalOcean]: {
    icon: IconBrandDigitalOcean,
    i18n: {
      brandName: 'common.terms.unknown',
    },
  },
  [SchemaDomainParts.ProviderIdent.unknown]: {
    icon: UnknownIcon,
    i18n: {
      brandName: 'common.terms.unknown',
    },
  },
};
