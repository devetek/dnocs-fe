import { useState } from 'react';

import { SearchIcon, Settings2Icon } from 'lucide-react';

import { useDevetekTranslations } from '@/services/i18n';

import { useBreakpoint } from '@/shared/libs/react-hooks/useBreakpoint';
import { Button } from '@/shared/presentation/atoms/Button';
import { Card } from '@/shared/presentation/atoms/Card';
import type { MultiSwitchTypes } from '@/shared/presentation/atoms/MultiSwitch';
import { MultiSwitch } from '@/shared/presentation/atoms/MultiSwitch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/presentation/atoms/Select';

import { useFilters } from '../../-model/store/filters';

export default function FilterBar() {
  const t = useDevetekTranslations();
  const isDesktop = useBreakpoint('md');

  const {
    view,
    engineType,
    searchQuery,
    setView,
    setEngineType,
    setSearchQuery,
    setPagination,
  } = useFilters();

  const [filterMainMobileShow, setFilterMainMobileShow] = useState(false);

  const handleClickFilter = () => {
    setFilterMainMobileShow((value) => !value);
  };

  const handleClickSwitchView = (
    item: MultiSwitchTypes.SwitchItem<'user' | 'db'>,
  ) => {
    setView(item.id === 'db' ? 'db' : 'user');
    setPagination(1);
  };

  const handleValueChangeEngine = (value: string) => {
    setEngineType(value);
    setPagination(1);
  };

  const elMainFilter = (
    <div className="flex flex-wrap gap-4 lg:gap-6">
      <div className="flex flex-row items-center gap-1">
        <p className="text-sm font-bold">{t('common.terms.view')}:</p>

        <MultiSwitch
          activeId={view}
          items={[
            {
              id: 'db',
              text: t('common.terms.database'),
            },
            {
              id: 'user',
              text: t('common.terms.user'),
            },
          ]}
          onClickItem={handleClickSwitchView}
        />
      </div>

      <div className="flex flex-row items-center gap-2">
        <p className="text-sm font-bold">{t('common.terms.engine')}:</p>

        <Select value={engineType} onValueChange={handleValueChangeEngine}>
          <SelectTrigger className="w-[128px]">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('common.terms.all')}</SelectItem>
            <SelectItem value="mariadb">MariaDB</SelectItem>
            <SelectItem value="postgresql">PostgreSQL</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  return (
    <div>
      <Card className="mb-6">
        <div className="py-2 px-4 flex flex-wrap gap-2 lg:gap-6 justify-between">
          {isDesktop ? (
            elMainFilter
          ) : (
            <Button variant="secondary" onClick={handleClickFilter}>
              <Settings2Icon width={16} height={16} />
            </Button>
          )}

          <label className="border rounded-md px-3 min-h-10 bg-white dark:bg-secondary flex items-center gap-2 focus-within:border-accent">
            <input
              type="text"
              className="grow outline-hidden"
              placeholder={t('common.terms.search')}
              defaultValue={searchQuery || ''}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSearchQuery(e.currentTarget.value);
                  setPagination(1);
                }
              }}
            />
            <SearchIcon width={16} height={16} />
          </label>
        </div>

        {filterMainMobileShow && !isDesktop && (
          <div className="py-2 px-4 flex flex-wrap gap-2 lg:gap-6">
            {elMainFilter}
          </div>
        )}
      </Card>
    </div>
  );
}
