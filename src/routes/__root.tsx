import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  ClientOnly,
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

import { AuthModelProvider } from '@/services/auth/model';
import { DialogController } from '@/services/dialog';
import { DevetekIntlProvider } from '@/services/i18n';
import { getLocale, loadMessages } from '@/services/i18n/usecase';
import { ModalController } from '@/services/modal';
import { SidepanelController } from '@/services/sidepanel';
import { ThemeScript } from '@/services/theme/lib/themeScript';
import { DevetekThemeModel } from '@/services/theme/model';
import { ToasterController } from '@/services/toaster';

import { EventsProvider } from '@/shared/libs/events';

import NotFoundView from './-view/NotFound';
import appCss from '../styles.css?url';

const getHeaders = createServerFn().handler(() => {
  const headers = getRequestHeaders();

  return {
    userAgent: headers.get('User-Agent'),
  };
});

export const Route = createRootRoute({
  ssr: true,
  notFoundComponent: NotFoundView,
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'dnocs | Managing Your Services',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: ShellComponent,
  loader: async () => {
    const locale = await getLocale();
    const messages = await loadMessages(locale);
    const requestHeaders = await getHeaders();

    return {
      locale,
      messages,
      requestHeaders,
    };
  },
  component: RootComponent,
});

function RootComponent() {
  const { locale, messages } = Route.useLoaderData();

  return (
    <EventsProvider>
      <DevetekIntlProvider locale={locale} messages={messages}>
        <DevetekThemeModel>
          <AuthModelProvider>
            <ClientOnly>
              <SidepanelController />
              <ModalController />
              <DialogController />
              <ToasterController />
            </ClientOnly>

            <Outlet />
          </AuthModelProvider>
        </DevetekThemeModel>
      </DevetekIntlProvider>
    </EventsProvider>
  );
}

function ShellComponent({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <ThemeScript />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
