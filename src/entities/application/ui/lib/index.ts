import type { ReactNode } from 'react';

import { SiGithub } from '@icons-pack/react-simple-icons';
import type { LucideProps } from 'lucide-react';

import LaravelIcon from '@/shared/assets/ico-laravel.svg';
import WordpressIcon from '@/shared/assets/ico-wordpress.png';

import type { SchemaApplicationParts } from '../../rules/schema';
import UnknownBundleIcon from '../presentation/UnknownBundleIcon';

export type Icon = (props: LucideProps) => ReactNode;

export const getBundleIcon = (
  bundleType: SchemaApplicationParts.BundleType,
): string | Icon => {
  switch (bundleType) {
    case 'wordpress':
      return WordpressIcon;

    case 'laravel':
      return LaravelIcon;
  }

  return UnknownBundleIcon;
};

export const getSourceBadge = (identity: SchemaApplicationParts.Identity) => {
  if (identity.source === 'independent') {
    return undefined;
  }

  return SiGithub;
  // switch (identity.sourceKind) {
  //   case 'github':
  //     return SiGithub;

  //   default:
  //     return undefined;
  // }
};
