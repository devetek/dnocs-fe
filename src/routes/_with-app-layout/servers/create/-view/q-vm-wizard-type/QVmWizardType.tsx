import { useNavigate } from '@tanstack/react-router';
import { FootprintsIcon, Settings2Icon, StarsIcon } from 'lucide-react';

import { FlexGrid } from '@/shared/presentation/atoms/FlexGrid';

import { BigQuestion } from '../../-presentation/BigQuestion';
import { ButtonHero } from '../../-presentation/ButtonHero';

export default function QVmWizardType() {
  const navigate = useNavigate();

  const handleClickInstant = () => {
    navigate({
      to: '/servers/create/vm-instant',
    });
  };

  const handleClickManual = () => {
    navigate({
      to: '/servers/create/vm-manual',
    });
  };

  return (
    <BigQuestion
      questionIcon={FootprintsIcon}
      question="What steps are you going to take?"
    >
      <div className="flex gap-2 mb-8">
        <FlexGrid gridItemsMax={4}>
          <ButtonHero
            icon={StarsIcon}
            title="Instant"
            subtitle="For supported cloud providers."
            desc="This option will handle all of the orchestration of creating a new virtual machine for you."
            onClick={handleClickInstant}
          />
          <ButtonHero
            icon={Settings2Icon}
            title="Manual"
            subtitle="For more granular control."
            desc="You'll need to prepare the infrastructure and provide the login yourself."
            onClick={handleClickManual}
          />
        </FlexGrid>
      </div>
    </BigQuestion>
  );
}
