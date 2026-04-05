import { useEffect, useState } from 'react';

import {
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  MailIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';

import { ApiUser } from '@/shared/api';
import { cn } from '@/shared/libs/tailwind/cn';
import { ErrorInline } from '@/shared/presentation/atoms/ErrorInline';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';

import { useDcContext } from '../../model';

const PAGE_SIZE = 3;

export default function FindUsers() {
  const { form } = useDcContext();

  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const [response] = ApiUser.Find.useGet({
    username: debouncedQuery || undefined,
    page,
    pageSize: PAGE_SIZE,
  });

  const users =
    response.$status === 'success' ? (response.users ?? []) : [];
  const totalPage =
    response.$status === 'success'
      ? (response.pagination?.total_page ?? 1)
      : 1;
  const isLoading =
    response.$status === 'loading' && response.prevData == null;

  const handleSelectUser = (userId: string, label: string) => {
    setSelectedUserId(userId);
    setSelectedLabel(label);
    form.setValue('user_id', userId, { shouldValidate: true });
    setOpen(false);
  };

  return (
    <section className="flex flex-col gap-1">
      <p className="text-sm font-medium">User</p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 text-sm rounded-md border bg-background',
              'hover:bg-accent/10 transition-colors text-left',
              !selectedUserId && 'text-muted-foreground',
            )}
          >
            <span className="flex items-center gap-2">
              <UserIcon className="size-3.5 shrink-0 text-primary/60" />
              <span className="truncate">
                {selectedLabel || 'Select a user…'}
              </span>
            </span>
            <ChevronDownIcon className="size-4 shrink-0 opacity-50 ml-2" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 w-(--radix-popover-trigger-width)"
          align="start"
          sideOffset={4}
        >
          <div className="flex flex-col">
            {/* Search bar */}
            <div className="p-2 border-b">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-md border bg-background focus-within:border-primary transition-colors">
                <SearchIcon className="size-3.5 text-primary/40 shrink-0" />
                <input
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary/40 min-w-0"
                  placeholder="Search by username…"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
                {isLoading && (
                  <Loader2Icon className="size-3.5 text-primary/40 shrink-0 animate-spin" />
                )}
              </div>
            </div>

            {/* User list */}
            <div className="min-h-36">
              {isLoading ? (
                <div className="flex items-center justify-center h-36 gap-2 text-sm text-primary/50">
                  <Loader2Icon className="size-4 animate-spin" />
                  Loading…
                </div>
              ) : users.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-36 gap-1 text-sm text-primary/50">
                  <UserIcon className="size-6 opacity-40" />
                  <span>No users found</span>
                </div>
              ) : (
                <ul className="py-1">
                  {users.map((user) => {
                    const userId = String(user.id);
                    const label =
                      user.fullname || user.username || user.email || userId;
                    const isSelected = userId === selectedUserId;

                    return (
                      <li key={user.id}>
                        <button
                          type="button"
                          className={cn(
                            'w-full flex items-center gap-2.5 px-3 py-2 text-sm',
                            'hover:bg-accent/10 transition-colors text-left',
                            isSelected && 'bg-primary/5',
                          )}
                          onClick={() => handleSelectUser(userId, label)}
                        >
                          {/* Avatar */}
                          <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden">
                            {user.avatar_url ? (
                              <img
                                src={user.avatar_url}
                                alt={user.username}
                                className="size-7 object-cover"
                              />
                            ) : (
                              <UserIcon className="size-3.5 text-primary/60" />
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-medium text-xs truncate">
                              {user.fullname || user.username}
                            </span>
                            {user.email && (
                              <span className="text-[0.65rem] text-primary/50 flex items-center gap-0.5 truncate">
                                <MailIcon className="size-2.5 shrink-0" />
                                {user.email}
                              </span>
                            )}
                          </div>

                          {isSelected && (
                            <CheckIcon className="size-3.5 shrink-0 text-primary" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Pagination footer */}
            {totalPage > 1 && (
              <div className="flex items-center justify-between px-3 py-2 border-t bg-card/30">
                <span className="text-xs text-primary/50">
                  Page {page} / {totalPage}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={page <= 1}
                    className="p-1 rounded hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    <ChevronLeftIcon className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={page >= totalPage}
                    className="p-1 rounded hover:bg-accent/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    onClick={() => setPage((p) => Math.min(totalPage, p + 1))}
                  >
                    <ChevronRightIcon className="size-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <ErrorInline message={form.formState.errors.user_id?.message} />
    </section>
  );
}
