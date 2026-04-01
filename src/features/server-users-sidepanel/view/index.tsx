import { useMemo, useState } from 'react';

import { PlusIcon, RefreshCwIcon } from 'lucide-react';

import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { useServerUserCreateSidepanel } from '@/features/server-user-create-sidepanel';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import { Button } from '@/shared/presentation/atoms/ButtonV2';
import { SearchInput } from '@/shared/presentation/atoms/SearchInput';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/presentation/atoms/Table';

import type { ServerUsersSidepanelProps as Props } from '../rules/types';

interface UserItem {
  username: string;
  uid: string;
  gid: string;
  home: string;
  shell: string;
}

export default function ServerUsersSidepanel(props: Props) {
  const { serverId, serverName } = props;

  const [searchQuery, setSearchQuery] = useState('');
  const [openServerUserCreateSidepanel] = useServerUserCreateSidepanel();

  const [responseUsers, refreshUsers] = ApiServer.Origin.$Id.User.useGet({
    serverId,
  });

  const users = useAdapter(responseUsers, (raw): UserItem[] => {
    return raw.map((item) => {
      if (typeof item === 'string') {
        return {
          username: item,
          uid: '-',
          gid: '-',
          home: '-',
          shell: '-',
        };
      }

      return {
        username: item.username ?? '-',
        uid: String(item.uid ?? '-'),
        gid: String(item.gid ?? '-'),
        home: item.home ?? '-',
        shell: item.shell ?? '-',
      };
    });
  });

  const filteredUsers = useMemo(() => {
    if (users.$status !== 'success') {
      return [];
    }

    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    if (!normalizedSearchQuery) {
      return users;
    }

    return users.filter((item) => {
      return [item.username, item.uid, item.gid, item.home, item.shell].some(
        (value) => value.toLowerCase().includes(normalizedSearchQuery),
      );
    });
  }, [searchQuery, users]);

  const handleClickAddUser = () => {
    openServerUserCreateSidepanel({
      $mode: 'push',
      serverId,
      onCreated: refreshUsers,
    });
  };

  return (
    <Layout classNameFrame="w-[calc(100svw_-_16px)] max-w-[680px]">
      <Layout.Title
        title="Linux Users"
        subtitle={serverName || `Server ID: ${serverId}`}
        hasCloseButton
      />

      <Layout.Content className="flex flex-col gap-y-4 pb-4">
        <div className="flex items-center gap-2">
          <SearchInput
            classNameWrapper="grow"
            value={searchQuery}
            autoComplete="off"
            onChange={setSearchQuery}
          />

          <Button
            buttonColor="secondary"
            disabled={responseUsers.$status === 'loading'}
            onClick={() => refreshUsers()}
          >
            <RefreshCwIcon className="size-4" />
            Refresh
          </Button>

          <Button buttonColor="secondary" onClick={handleClickAddUser}>
            <PlusIcon className="size-4" />
            Add New
          </Button>
        </div>

        {users.$status === 'initial' || users.$status === 'loading' ? (
          <div>Loading users...</div>
        ) : null}

        {users.$status === 'failed' ? (
          <div>Failed to load users.</div>
        ) : null}

        {users.$status === 'success' && filteredUsers.length < 1 ? (
          <div>No user found.</div>
        ) : null}

        {users.$status === 'success' && filteredUsers.length > 0 ? (
          <div className="w-full rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader className="bg-background [&_tr]:border-b">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="px-3 py-2 h-auto font-semibold text-md">
                    Username
                  </TableHead>
                  <TableHead className="px-3 py-2 h-auto font-semibold text-md">
                    UID
                  </TableHead>
                  <TableHead className="px-3 py-2 h-auto font-semibold text-md">
                    GID
                  </TableHead>
                  <TableHead className="px-3 py-2 h-auto font-semibold text-md">
                    Home
                  </TableHead>
                  <TableHead className="px-3 py-2 h-auto font-semibold text-md">
                    Shell
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredUsers.map((item, index) => (
                  <TableRow key={`${item.username}-${item.uid}-${index}`}>
                    <TableCell className="px-3 py-2">{item.username}</TableCell>
                    <TableCell className="px-3 py-2">{item.uid}</TableCell>
                    <TableCell className="px-3 py-2">{item.gid}</TableCell>
                    <TableCell className="px-3 py-2">{item.home}</TableCell>
                    <TableCell className="px-3 py-2">{item.shell}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </Layout.Content>
    </Layout>
  );
}
