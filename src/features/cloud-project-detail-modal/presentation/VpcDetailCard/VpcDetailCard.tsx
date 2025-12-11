import { ServerIcon } from 'lucide-react';

import { Card } from '@/shared/presentation/atoms/Card';

export default function VpcDetailCard(props: Props) {
  const { vpcName, vpcSubnet } = props;

  return (
    <Card className="p-2 flex items-center justify-between">
      <div className="flex flex-col">
        <p className="text-md font-bold">{vpcName}</p>
        <p className="text-sm">{vpcSubnet}</p>
      </div>

      <div className="shrink-0">
        <ServerIcon className="w-6 h-6" />
      </div>
    </Card>
  );
}

interface Props {
  vpcName: string;
  vpcSubnet: string;
}
