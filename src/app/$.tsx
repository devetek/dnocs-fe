import { createFileRoute } from '@tanstack/react-router';

import NotFoundView from './-view/NotFound';

export const Route = createFileRoute('/$')({
  component: NotFoundView,
});
