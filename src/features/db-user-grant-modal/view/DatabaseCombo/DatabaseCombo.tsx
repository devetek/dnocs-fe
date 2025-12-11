import { useState } from 'react';

import { ChevronsUpDown } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiDatabase } from '@/shared/api';
import { useDebounceValue } from '@/shared/libs/react-hooks/useDebounce';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';
import { ScrollArea } from '@/shared/presentation/atoms/ScrollArea';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';

import { useDugContext } from '../../model';

export default function DatabaseList() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { selectedDB, props, setSelectedDB } = useDugContext();

  const userId = useAuthLoggedIn().userProfile.id;

  const [searchQueryDbName, setSearchQueryDbName] = useState('');
  const [debouncedQuery] = useDebounceValue(searchQueryDbName);
  const [response] = ApiDatabase.Find.useGet({
    userId,
    engine:
      props.selectedUserDbEngine === 'postgresql' ? 'postgresql' : 'mariadb',
    page: 1,
    searchQuery: debouncedQuery,
  });

  const cnButton = cn(
    'w-full justify-between dark:bg-secondary dark:hover:bg-accent',
    {
      'text-foreground/50': !selectedDB?.dbName,
    },
  );

  return (
    <>
      <p className="text-sm font-medium">Database</p>

      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className={cnButton}
          >
            <p>{selectedDB?.dbName || 'Select Database'}</p>
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[325px] p-0">
          <div className="p-1">
            <SearchInput
              value={searchQueryDbName}
              onChange={(value) => {
                setSearchQueryDbName(value);
              }}
            />
          </div>

          <ScrollArea className="p-1 max-h-[300px] flex flex-col gap-1">
            {response.$status === 'success' &&
              response.databases?.map((database) => {
                const { name, id, engine } = database;

                if (!name || !id || !engine) return null;

                return (
                  <Button
                    key={id}
                    className="px-4 py-2 w-full"
                    variant="ghost"
                    onClick={() => {
                      setSelectedDB({
                        dbID: id,
                        dbName: name,
                        dbEngine: engine,
                      });

                      setIsPopoverOpen(false);
                    }}
                  >
                    <p className="w-full text-left">
                      [{id}] {name}
                    </p>
                  </Button>
                );
              })}
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
}
