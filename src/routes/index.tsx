import { createFileRoute } from '@tanstack/react-router';

import { ModelProvider } from './-models';
import LandingView from './-view';

export const Route = createFileRoute('/')({
  ssr: true,
  component: Landing,
});

function Landing() {
  return (
    <ModelProvider>
      <LandingView />
    </ModelProvider>
  );
}
