import { HardDriveIcon } from 'lucide-react';

import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';

import { BigQuestion } from '../../-presentation/BigQuestion';
import { ButtonHero } from '../../-presentation/ButtonHero';

export default function QKindOfServer() {
  return (
    <BigQuestion question="What kind of server are you trying to create?">
      <FlexGrid gridItemsMax={4}>
        <ButtonHero
          icon={HardDriveIcon}
          title="Virtual Machine"
          desc="A good ol'fashioned VM for your server."
          active
        />
      </FlexGrid>
    </BigQuestion>
  );
}
