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

  const { ownership, setPagination, setOwnership, hasModules, setHasModules } =
    useFilterModel();

  return (
    <div className="flex items-center gap-1">
      <Combobox
        classNameButton="bg-card w-44"
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
            {
              label: t('common.terms.publicResource'),
              value: 'public-resource',
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
        classNameButton="bg-card w-40"
        placeholder="Modules"
        items={
          [
            {
              label: 'All',
              value: null,
            },
            {
              label: 'Has Database',
              value: 'db',
            },
            {
              label: 'Has Memstore',
              value: 'memstore',
            },
          ] as const
        }
        value={hasModules}
        onChange={(value) => {
          setPagination(1);
          setHasModules(value);
        }}
      />
    </div>
  );
};

const MobileFilters = () => {
  const t = useDevetekTranslations();

  const { ownership, setPagination, setOwnership, hasModules, setHasModules } =
    useFilterModel();

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
            classNameButton="bg-card"
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
                {
                  label: t('common.terms.publicResource'),
                  value: 'public-resource',
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
            classNameButton="bg-card"
            placeholder="Modules"
            items={
              [
                {
                  label: 'All',
                  value: null,
                },
                {
                  label: 'Has Database',
                  value: 'db',
                },
                {
                  label: 'Has Memstore',
                  value: 'memstore',
                },
              ] as const
            }
            value={hasModules}
            onChange={(value) => {
              setPagination(1);
              setHasModules(value);
            }}
          />
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default function FilterBar() {
  const { searchQuery, setSearchQuery } = useFilterModel();

  const isDesktop = useBreakpoint('md');

  const t = useDevetekTranslations();

  return (
    <Card className="bg-card/40 rounded-xl p-2 flex items-center justify-between gap-2">
      <SearchInput
        placeholder={t('common.terms.search')}
        defaultValue={searchQuery}
        onEnter={setSearchQuery}
      />

      {isDesktop ? <DesktopFilters /> : <MobileFilters />}
    </Card>
  );
}
