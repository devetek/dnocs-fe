import { Card } from '@/shared/presentation/atoms/Card';
import { AsideHelpSupport } from '@/widgets/aside-help-support';

export default function AsideHelp() {
  return (
    <Card className="shadow-none h-max rounded-2xl">
      <AsideHelpSupport.Complete topic="appCreation" />
    </Card>
  );
}
