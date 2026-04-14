import { useFormStore } from '../../-model/store/form';

import Step1Source from './step-1-source';
import Step2Details from './step-2-details';
import Step3Config from './step-3-config';
import Step4Deploy from './step-4-deploy';

export default function MainWizard() {
  const [progress] = useFormStore((s) => [s.progress]);

  switch (progress) {
    case '1-source':
      return <Step1Source />;

    case '2-details':
      return <Step2Details />;

    case '3-configuration':
      return <Step3Config />;

    case '4-deploy':
      return <Step4Deploy />;

    default:
      return null;
  }
}
