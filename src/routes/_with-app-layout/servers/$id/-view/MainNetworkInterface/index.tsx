import { NetworkIcon } from 'lucide-react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/presentation/atoms/Table';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import { useEmit } from '../../-model/events';
import { useServerNetworkInterfaceModel } from '../../-model/server-network-interface';
import { NetworkStates as UIStates } from '../_NetworkStates';

function NetworkInterfaceTable() {
  const [networkInterfaces] = useServerNetworkInterfaceModel((s) => [
    s.networkInterfaces,
  ]);

  if (networkInterfaces.$status === 'loading') {
    return <UIStates.Loading />;
  }

  if (networkInterfaces.$status === 'failed') {
    return <UIStates.Failed />;
  }

  if (networkInterfaces.$status !== 'success' || networkInterfaces.length < 1) {
    return <div>No network interface found.</div>;
  }

  return (
    <div className="w-full rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-background [&_tr]:border-b">
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Interface
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Address
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              IPv4
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              IPv6
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Subnet
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {networkInterfaces.map((item, index) => (
            <TableRow key={`${item.interfaceName}-${item.address}-${index}`}>
              <TableCell className="px-3 py-2">{item.interfaceName}</TableCell>
              <TableCell className="px-3 py-2">{item.address}</TableCell>
              <TableCell className="px-3 py-2">{item.ipV4}</TableCell>
              <TableCell className="px-3 py-2">{item.ipV6}</TableCell>
              <TableCell className="px-3 py-2">{item.subnet}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function MainNetworkInterface() {
  const emit = useEmit();

  const handleRefresh = () => {
    emit('@servers::detail/server-network-refresh', null);
  };

  return (
    <CardSectionTitled
      placement="main"
      title="Network Interface"
      icon={NetworkIcon}
      classNameWrapper="overflow-hidden"
      toolbarActions={{
        label: 'Refresh',
        onClick: handleRefresh,
      }}
    >
      <NetworkInterfaceTable />
    </CardSectionTitled>
  );
}