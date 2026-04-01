import { useState } from 'react';

import { ChevronsUpDown } from 'lucide-react';

import { useSidepanelEmit } from '@/services/sidepanel/model/event';
import Layout from '@/services/sidepanel/ui/presentation/Layout/General';
import { useToaster } from '@/services/toaster';

import { ApiServer, ApiUser } from '@/shared/api';
import { useDebounceValue } from '@/shared/libs/react-hooks/useDebounce';
import { cn } from '@/shared/libs/tailwind/cn';
import { Button as LegacyButton } from '@/shared/presentation/atoms/Button';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { Input } from '@/shared/presentation/atoms/Input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/presentation/atoms/Popover';
import { ScrollArea } from '@/shared/presentation/atoms/ScrollArea';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/presentation/atoms/Select';

import type { ServerUserCreateSidepanelProps as Props } from '../rules/types';

export default function ServerUserCreateSidepanel(props: Props) {
  const { serverId, onCreated } = props;

  const emitSidepanel = useSidepanelEmit();
  const [pushToast] = useToaster();
  const [isUsernamePopoverOpen, setIsUsernamePopoverOpen] = useState(false);
  const [usernameQuery, setUsernameQuery] = useState('');
  const [usernamePage, setUsernamePage] = useState(1);
  const [debouncedUsernameQuery] = useDebounceValue(usernameQuery);

  const [usersResponse] = ApiUser.Find.useGet({
    username: debouncedUsernameQuery || undefined,
    page: usernamePage,
    pageSize: 5,
  });

  const [username, setUsername] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [homeDirectory, setHomeDirectory] = useState('/home/');
  const [group, setGroup] = useState('admin');
  const [isCreating, setIsCreating] = useState(false);

  const users = usersResponse.$status === 'success' ? usersResponse.users ?? [] : [];
  const totalPages = usersResponse.$status === 'success'
    ? Math.max(1, usersResponse.pagination.total_page || 1)
    : 1;

  const canGoPrevPage = usernamePage > 1;
  const canGoNextPage = usernamePage < totalPages;
  const canSubmit =
    !isCreating &&
    Boolean(username.trim()) &&
    Boolean(selectedUserId) &&
    Boolean(password.trim());

  const handleChangeUsernameQuery = (value: string) => {
    setUsernameQuery(value);
    setUsernamePage(1);
  };

  const handleCreate = async () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername) {
      pushToast('error', 'Username is required.');
      return;
    }

    if (!selectedUserId) {
      pushToast('error', 'Please select a valid username.');
      return;
    }

    if (!password.trim()) {
      pushToast('error', 'Password is required.');
      return;
    }

    setIsCreating(true);

    const response = await ApiServer.Origin.$Id.User.Create.doPost({
      serverId,
      payload: {
        id: selectedUserId,
        username: normalizedUsername,
        password,
        group,
        home_dir: homeDirectory,
      },
    });

    if (response.$status === 'failed') {
      pushToast('error', response.error.message);
      setIsCreating(false);
      return;
    }

    pushToast('success', 'Create user machine in progress!');
    onCreated?.();
    emitSidepanel('%%sidepanel/pop', null);
    setIsCreating(false);
  };

  return (
    <Layout classNameFrame="w-[calc(100svw_-_16px)] max-w-[520px]">
      <Layout.CloseButton icon="back" position="left" />

      <Layout.Title
        title="Add New"
        subtitle={`Server ID: ${serverId}`}
        hasCloseButton={false}
      />

      <Layout.Content className="flex flex-col gap-y-3 pb-4">
        <div className="grid gap-y-1">
          <span className="text-sm font-medium">Username</span>
          <Popover
            open={isUsernamePopoverOpen}
            onOpenChange={setIsUsernamePopoverOpen}
          >
            <PopoverTrigger asChild>
              <LegacyButton
                variant="outline"
                role="combobox"
                aria-expanded={isUsernamePopoverOpen}
                className={cn('w-full justify-between dark:bg-secondary dark:hover:bg-accent', {
                  'text-foreground/50': !username,
                })}
              >
                <p>{username || 'Select username'}</p>
                <ChevronsUpDown className="opacity-50" />
              </LegacyButton>
            </PopoverTrigger>
            <PopoverContent className="w-[468px] p-0">
              <div className="p-1">
                <SearchInput
                  value={usernameQuery}
                  onChange={handleChangeUsernameQuery}
                  placeholder="Search username"
                />
              </div>

              <ScrollArea className="p-1 max-h-[260px] flex flex-col gap-1">
                {usersResponse.$status === 'loading' && (
                  <p className="px-3 py-2 text-sm text-muted-foreground">Loading users...</p>
                )}

                {usersResponse.$status === 'failed' && (
                  <p className="px-3 py-2 text-sm text-destructive">Failed to load users</p>
                )}

                {usersResponse.$status === 'success' && users.length === 0 && (
                  <p className="px-3 py-2 text-sm text-muted-foreground">No users found</p>
                )}

                {usersResponse.$status === 'success' && users.map((user) => (
                  <LegacyButton
                    key={user.id}
                    className="px-4 py-2 w-full"
                    variant="ghost"
                    onClick={() => {
                      setSelectedUserId(user.id);
                      setUsername(user.username);
                      setHomeDirectory(`/home/${user.username}`);
                      setIsUsernamePopoverOpen(false);
                    }}
                  >
                    <p className="w-full text-left">{user.username}</p>
                  </LegacyButton>
                ))}
              </ScrollArea>

              <div className="border-t p-2 flex items-center justify-between gap-2">
                <LegacyButton
                  variant="outline"
                  size="sm"
                  disabled={!canGoPrevPage || usersResponse.$status !== 'success'}
                  onClick={() => setUsernamePage((currentPage) => currentPage - 1)}
                >
                  Prev
                </LegacyButton>

                <p className="text-xs text-muted-foreground">
                  Page {usernamePage} of {totalPages}
                </p>

                <LegacyButton
                  variant="outline"
                  size="sm"
                  disabled={!canGoNextPage || usersResponse.$status !== 'success'}
                  onClick={() => setUsernamePage((currentPage) => currentPage + 1)}
                >
                  Next
                </LegacyButton>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-y-1">
          <span className="text-sm font-medium">Password</span>
          <Input
            type="password"
            value={password}
            placeholder="Input password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="grid gap-y-1">
          <span className="text-sm font-medium">Home Directory</span>
          <Input
            value={homeDirectory}
            placeholder="e.g. /home/devops"
            onChange={(e) => setHomeDirectory(e.target.value)}
          />
        </div>

        <div className="grid gap-y-1">
          <span className="text-sm font-medium">Group</span>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Select group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">admin</SelectItem>
              <SelectItem value="staff">staff</SelectItem>
              <SelectItem value="guest">guest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Layout.Content>

      <Layout.Cta className="gap-y-2">
        <Button disabled={!canSubmit} onClick={handleCreate}>
          {isCreating ? 'Creating...' : 'Create User'}
        </Button>
      </Layout.Cta>
    </Layout>
  );
}
