import { PlugZapIcon } from 'lucide-react';

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
import { useServerPortInUsedModel } from '../../-model/server-port-in-used';
import { NetworkStates as UIStates } from '../_NetworkStates';

function PortInUsedTable() {
  const [portsInUsed] = useServerPortInUsedModel((s) => [s.portsInUsed]);

  if (portsInUsed.$status === 'loading') {
    return <UIStates.Loading />;
  }

  if (portsInUsed.$status === 'failed') {
    return <UIStates.Failed />;
  }

  if (portsInUsed.$status !== 'success' || portsInUsed.length < 1) {
    return <div>No port in used found.</div>;
  }

  return (
    <div className="w-full rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="bg-background [&_tr]:border-b">
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Port
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Process Name
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Process ID
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              Allow From
            </TableHead>
            <TableHead className="px-3 py-2 h-auto font-semibold text-md">
              State
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {portsInUsed.map((item, index) => (
            <TableRow key={`${item.port}-${item.processId}-${index}`}>
              <TableCell className="px-3 py-2">{item.port}</TableCell>
              <TableCell className="px-3 py-2">{item.processName}</TableCell>
              <TableCell className="px-3 py-2">{item.processId}</TableCell>
              <TableCell className="px-3 py-2">{item.allowFrom}</TableCell>
              <TableCell className="px-3 py-2">{item.state}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function MainPortInUsed() {
  const emit = useEmit();

  const handleRefresh = () => {
    emit('@servers::detail/server-network-refresh', null);
  };

  return (
    <CardSectionTitled
      placement="main"
      title="Port In Used"
      icon={PlugZapIcon}
      classNameWrapper="overflow-hidden"
      toolbarActions={{
        label: 'Refresh',
        onClick: handleRefresh,
      }}
    >
      <PortInUsedTable />
    </CardSectionTitled>
  );
}