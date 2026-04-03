import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';
import NotFoundView from './routes/-view/NotFound';

// Create a new router instance
export const getRouter = () =>
  createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: NotFoundView,
  });
