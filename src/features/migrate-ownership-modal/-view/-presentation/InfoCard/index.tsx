import type { ComponentType } from 'react';

import type { LucideProps } from 'lucide-react';

import { iife } from '@/shared/libs/browser/fn';
import {
  IconApp,
  IconCloud,
  IconGlobe,
  IconLoadBalancer,
  IconLock,
  IconServer,
} from '@/shared/presentation/icons';

import type { Module } from '../../../-rules/types';

const MODULE_LOGO: Record<Module['type'], ComponentType<LucideProps>> = {
  'load-balancer': IconLoadBalancer,
  application: IconApp,
  server: IconServer,
  domain: IconGlobe,
  'cloud-project': IconCloud,
  'secret-ssh': IconLock,
};

interface InfoCardProps {
  mod: Module;
}

export default function InfoCard(props: InfoCardProps) {
  const { mod } = props;

  const Logo = MODULE_LOGO[mod.type];

  const renderedResourceType = iife(() => {
    switch (mod.type) {
      case 'load-balancer':
        return 'Load Balancer';

      case 'application':
        return 'Application';

      case 'server':
        return 'Server';

      case 'domain':
        return 'Domain';

      case 'secret-ssh':
        return 'SSH Secret';

      case 'cloud-project':
        return 'Cloud Project';
    }
  }).toLocaleUpperCase();

  return (
    <div className="border rounded-md bg-background inset-shadow-sm grid grid-cols-[auto_1fr] items-center">
      <div className="p-3">
        <div className="p-2 bg-card shadow border rounded-sm">
          <Logo className="text-primary size-7" />
        </div>
      </div>

      <div className="py-3 pr-4 flex flex-col justify-center">
        <p className="text-primary/60 text-xs font-bold uppercase tracking-wide">
          {renderedResourceType} TO MIGRATE
        </p>

        <p className="text-primary font-medium text-lg">{mod.moduleName}</p>
      </div>
    </div>
  );
}
