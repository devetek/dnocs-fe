import { useState } from 'react';

import { buildContext } from '@/shared/libs/react-factories/buildContext';

import { useSubscribe } from './events';

export const [ModelProvider, useModel] = buildContext('LandingModel', () => {
  const [isResponsiveFormVisible, setIsResponsiveFormVisible] = useState(false);

  useSubscribe('@landing/responsive/login-form/open', () => {
    setIsResponsiveFormVisible(true);
  });

  useSubscribe('@landing/responsive/login-form/close', () => {
    setIsResponsiveFormVisible(false);
  });

  return {
    isResponsiveFormVisible,
  };
});
