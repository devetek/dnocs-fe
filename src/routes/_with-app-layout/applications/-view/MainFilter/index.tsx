import { PopoverContent } from '@radix-ui/react-popover';
import { FilterIcon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import { Popover, PopoverTrigger } from '@/shared/presentation/atoms/Popover';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';
import { Combobox } from '@/shared/presentation/molecules/Combobox';

import { useFilterModel } from '../../-model/filters';

const DesktopFilters = () => {
  const t = useDevetekTranslations();

  const {
    setPagination,
    setOwnership,
    ownership,
    setBundleType,
    bundleType,
    sourceType,
    setSourceType,
  } = useFilterModel();

  return (
    <div className="flex items-center gap-2">
      <Combobox
        classNameButton="bg-card w-40"
        placeholder={t('common.terms.ownership')}
        items={
          [
            {
              label: t('common.terms.mine'),
              value: 'mine',
            },
            {
              label: t('common.terms.teamResource'),
              value: 'team',
            },
          ] as const
        }
        value={ownership}
        onChange={(value) => {
          setPagination(1);
          setOwnership(value);
        }}
      />
      <Combobox
        classNameButton="bg-card w-36"
        placeholder="Bundle Type"
        items={
          [
            {
              label: t('common.terms.all'),
              value: 'all',
            },
            {
              label: 'Wordpress',
              value: 'wordpress',
            },
            {
              label: 'Laravel',
              value: 'laravel',
            },
          ] as const
        }
        value={bundleType}
        onChange={(value) => {
          setPagination(1);
          setBundleType(value);
        }}
      />
      <Combobox
        classNameButton="bg-card w-36"
        placeholder="Source Type"
        items={
          [
            {
              label: t('common.terms.all'),
              value: 'all',
            },
            {
              label: t('common.terms.noSource'),
              value: 'no-source',
            },
            {
              label: 'Github',
              value: 'github',
            },
          ] as const
        }
        value={sourceType}
        onChange={(value) => {
          setPagination(1);
          setSourceType(value);
        }}
      />
    </div>
  );
};

const MobileFilters = () => {
  const t = useDevetekTranslations();

  const {
    setPagination,
    setOwnership,
    ownership,
    setBundleType,
    bundleType,
    sourceType,
    setSourceType,
  } = useFilterModel();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-card" variant="outline">
          <FilterIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60 pt-2 pr-2 z-10">
        <Card className="shadow-xl flex flex-col gap-2 p-2">
          <Combobox
            classNameButton="bg-card w-full"
            placeholder="Ownership"
            items={
              [
                {
                  label: t('common.terms.mine'),
                  value: 'mine',
                },
                {
                  label: t('common.terms.teamResource'),
                  value: 'team',
                },
              ] as const
            }
            value={ownership}
            onChange={(value) => {
              setPagination(1);
              setOwnership(value);
            }}
          />
          <Combobox
            classNameButton="bg-card w-full"
            placeholder="Bundle Type"
            items={
              [
                {
                  label: t('common.terms.all'),
                  value: 'all',
                },
                {
                  label: 'Wordpress',
                  value: 'wordpress',
                },
                {
                  label: 'Laravel',
                  value: 'laravel',
                },
              ] as const
            }
            value={bundleType}
            onChange={(value) => {
              setPagination(1);
              setBundleType(value);
            }}
          />
          <Combobox
            classNameButton="bg-card w-full"
            placeholder="Source Type"
            items={
              [
                {
                  label: t('common.terms.all'),
                  value: 'all',
                },
                {
                  label: t('common.terms.noSource'),
                  value: 'no-source',
                },
                {
                  label: 'Github',
                  value: 'github',
                },
              ] as const
            }
            value={sourceType}
            onChange={(value) => {
              setPagination(1);
              setSourceType(value);
            }}
          />
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default function MainFilter() {
  const t = useDevetekTranslations();

  const { searchQuery, setSearchQuery } = useFilterModel();

  const isDesktop = useBreakpoint('sm', true);

  return (
    <Card className="bg-card/40 rounded-xl p-2 flex items-center justify-between gap-2">
      <SearchInput
        classNameWrapper="w-48"
        placeholder={t('common.terms.search')}
        defaultValue={searchQuery}
        onEnter={setSearchQuery}
      />

      {isDesktop ? <DesktopFilters /> : <MobileFilters />}
    </Card>
  );
}
