import { useRef, useState } from 'react';

import {
  ActivityIcon,
  CirclePlayIcon,
  CircleStopIcon,
  RotateCcwIcon,
} from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import type { SchemaOsServiceParts } from '@/entities/os-service/rules/schema';

import { Button } from '@/shared/presentation/atoms/Button';
import { Dropdown } from '@/shared/presentation/atoms/Dropdown';
import Shimmer from '@/shared/presentation/atoms/Shimmer';
import { Tooltip } from '@/shared/presentation/atoms/Tooltip';

import { ServiceState } from '../ServiceState';

import type { ServiceTableRowProps } from './types';

function RowHeader() {
  const t = useDevetekTranslations();

  return (
    <div className="bg-background py-2 px-3 flex items-center gap-2">
      <Tooltip
        className="basis-[10%]"
        message="Is Loaded, Is Active, Service State"
      >
        <p className="font-semibold text-md leading-5">
          {t('common.terms.state')}
        </p>
      </Tooltip>
      <p className="basis-[70%] font-semibold text-md leading-5">
        {t('common.terms.serviceName')}
      </p>
      <p className="basis-[20%] font-semibold text-md leading-5">
        {t('common.terms.actions')}
      </p>
    </div>
  );
}

function Row(props: ServiceTableRowProps) {
  const { serviceName, serviceState, onClickServiceDetail, onClickActivity } =
    props;

  const refDropdownTarget = useRef<HTMLButtonElement>(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const t = useDevetekTranslations();

  const handleClickActivity = (activity: SchemaOsServiceParts.Activity) => {
    return () => {
      onClickActivity?.(activity);
      setDropdownOpen(false);
    };
  };

  return (
    <>
      <div className="px-3 py-2 flex items-center border-t gap-2">
        <p className="basis-[10%] flex items-center">
          <Tooltip
            as="span"
            message={
              <ServiceState.Label
                as="span"
                serviceState={serviceState}
                colorless
              />
            }
          >
            <ServiceState.Badge
              className="size-6"
              serviceState={serviceState}
            />
          </Tooltip>
        </p>

        <p className="basis-[70%] text-sm">{serviceName}</p>

        <p className="basis-[20%] flex items-center gap-1 text-sm">
          <Button size="sm" variant="outline" onClick={onClickServiceDetail}>
            {t('common.actions.details')}
          </Button>

          <Button
            ref={refDropdownTarget}
            size="sm"
            variant="outline"
            onClick={() => setDropdownOpen(true)}
          >
            <ActivityIcon />
          </Button>
        </p>
      </div>

      <Dropdown
        refTarget={refDropdownTarget}
        isOpen={dropdownOpen}
        alignment="right"
        position="top"
        onClickOutside={() => setDropdownOpen(false)}
      >
        <div className="p-2 flex flex-col gap-1">
          <Button variant="ghost" onClick={handleClickActivity('start')}>
            <CirclePlayIcon /> {t('common.actions.start')}
          </Button>

          <Button variant="ghost" onClick={handleClickActivity('restart')}>
            <RotateCcwIcon /> {t('common.actions.restart')}
          </Button>

          <Button variant="ghost" onClick={handleClickActivity('reload')}>
            <RotateCcwIcon /> {t('common.actions.reload')}
          </Button>

          <Button variant="ghost" onClick={handleClickActivity('stop')}>
            <CircleStopIcon /> {t('common.actions.stop')}
          </Button>
        </div>
      </Dropdown>
    </>
  );
}

Row.PlaceholderLoading = function PlaceholderLoading() {
  return (
    <div className="px-3 py-2 border-t flex items-center gap-2">
      <div className="basis-[10%]">
        <Shimmer className="size-6" />
      </div>

      <div className="basis-[70%]">
        <Shimmer className="w-24 h-5 py-0.5" />
      </div>

      <div className="basis-[20%] flex items-center gap-1">
        <Shimmer className="w-14 h-8" />
        <Shimmer className="w-11 h-8" />
      </div>
    </div>
  );
};

export const ServiceTablePartials = {
  RowHeader,
  Row,
};
