import { useState } from 'react';

import { RefreshCwIcon } from 'lucide-react';

import Layout from '@/services/sidepanel/ui/presentation/Layout/General';

import { ApiServer } from '@/shared/api';
import { useAdapter } from '@/shared/libs/api-client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/presentation/atoms/Table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/presentation/atoms/Tabs';

import type { ServerNetworksSidepanelProps as Props } from '../rules/types';

export default function ServerNetworksSidepanel(props: Props) {
  const { serverId, serverName } = props;

  const [activeTab, setActiveTab] = useState<'ports' | 'interfaces'>('ports');

  const [responsePorts, refreshPorts] = ApiServer.Origin.$Id.PortInUsed.useGet(
    { serverId },
  );

  const [responseInterfaces, refreshInterfaces] =
    ApiServer.Origin.$Id.NetworkInterface.useGet({ serverId });

  const ports = useAdapter(responsePorts, (raw) =>
    raw.map((item) => ({
      port: String(item.port ?? '-'),
      processName: item.process_name ?? '-',
      processId: String(item.process_id ?? '-'),
      allowFrom: item.allow_from ?? '-',
      state: item.state ?? '-',
    })),
  );

  const interfaces = useAdapter(responseInterfaces, (raw) =>
    raw.flatMap((item) => {
      const interfaceName = item.interface_name ?? '-';
      const interfaceData = item.interface_data ?? [];

      if (interfaceData.length < 1) {
        return [{ interfaceName, address: '-', ipV4: '-', ipV6: '-', subnet: '-' }];
      }

      return interfaceData.map((detail) => ({
        interfaceName,
        address: detail.address ?? '-',
        ipV4: detail.ip_v4 ?? '-',
        ipV6: detail.ip_v6 ?? '-',
        subnet: detail.subnet ?? '-',
      }));
    }),
  );

  const handleRefresh = () => {
    if (activeTab === 'ports') refreshPorts();
    else refreshInterfaces();
  };

  const isLoading =
    activeTab === 'ports'
      ? responsePorts.$status === 'loading'
      : responseInterfaces.$status === 'loading';

  return (
    <Layout classNameFrame="w-[calc(100svw_-_16px)] max-w-[560px]">
      <Layout.Title
        className="bg-background"
        title="Networks"
        subtitle={serverName || `Server ID: ${serverId}`}
        hasCloseButton
      />

      <Layout.Content className="flex flex-col gap-y-3 pt-4 pb-4 border-t bg-muted/30">
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 dark:bg-zinc-800 dark:ring-1 dark:ring-white/10">
            <TabsTrigger className="w-full" value="ports">
              Active Ports
            </TabsTrigger>
            <TabsTrigger className="w-full" value="interfaces">
              Network Interface
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ports" className="mt-3">
            {ports.$status === 'initial' || ports.$status === 'loading' ? (
              <p className="text-sm text-muted-foreground">Loading ports...</p>
            ) : ports.$status === 'failed' ? (
              <p className="text-sm text-destructive">Failed to load ports.</p>
            ) : ports.length < 1 ? (
              <p className="text-sm text-muted-foreground">No active ports found.</p>
            ) : (
              <div className="w-full rounded-lg border border-border bg-card overflow-x-auto shadow-sm">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/60">
                  <span className="text-xs text-muted-foreground">{ports.length} ports</span>
                  <button
                    className="cursor-pointer p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-default"
                    disabled={isLoading}
                    onClick={handleRefresh}
                  >
                    <RefreshCwIcon className="size-3.5 text-muted-foreground" />
                  </button>
                </div>
                <Table>
                  <TableHeader className="bg-muted/40 [&_tr]:border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">Port</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">Process Name</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">PID</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">Allow From</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">State</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ports.map((item, index) => (
                      <TableRow key={`${item.port}-${item.processId}-${index}`} className="hover:bg-muted/40">
                        <TableCell className="px-3 py-2 text-sm font-medium">{item.port}</TableCell>
                        <TableCell className="px-3 py-2 text-sm">{item.processName}</TableCell>
                        <TableCell className="px-3 py-2 text-sm text-muted-foreground">{item.processId}</TableCell>
                        <TableCell className="px-3 py-2 text-sm text-muted-foreground">{item.allowFrom}</TableCell>
                        <TableCell className="px-3 py-2 text-sm text-muted-foreground">{item.state}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="interfaces" className="mt-3">
            {interfaces.$status === 'initial' || interfaces.$status === 'loading' ? (
              <p className="text-sm text-muted-foreground">Loading interfaces...</p>
            ) : interfaces.$status === 'failed' ? (
              <p className="text-sm text-destructive">Failed to load interfaces.</p>
            ) : interfaces.length < 1 ? (
              <p className="text-sm text-muted-foreground">No network interface found.</p>
            ) : (
              <div className="w-full rounded-lg border border-border bg-card overflow-x-auto shadow-sm">
                <div className="flex items-center justify-between px-3 py-1.5 border-b border-border bg-muted/60">
                  <span className="text-xs text-muted-foreground">{interfaces.length} interfaces</span>
                  <button
                    className="cursor-pointer p-1 rounded hover:bg-black/10 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-default"
                    disabled={isLoading}
                    onClick={handleRefresh}
                  >
                    <RefreshCwIcon className="size-3.5 text-muted-foreground" />
                  </button>
                </div>
                <Table>
                  <TableHeader className="bg-muted/40 [&_tr]:border-b">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">Interface</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">Address</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">IPv4</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">IPv6</TableHead>
                      <TableHead className="px-3 py-2 h-auto font-semibold text-xs text-muted-foreground uppercase tracking-wide">Subnet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {interfaces.map((item, index) => (
                      <TableRow key={`${item.interfaceName}-${item.address}-${index}`} className="hover:bg-muted/40">
                        <TableCell className="px-3 py-2 text-sm font-medium">{item.interfaceName}</TableCell>
                        <TableCell className="px-3 py-2 text-sm">{item.address}</TableCell>
                        <TableCell className="px-3 py-2 text-sm text-muted-foreground">{item.ipV4}</TableCell>
                        <TableCell className="px-3 py-2 text-sm text-muted-foreground">{item.ipV6}</TableCell>
                        <TableCell className="px-3 py-2 text-sm text-muted-foreground">{item.subnet}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Layout.Content>
    </Layout>
  );
}
