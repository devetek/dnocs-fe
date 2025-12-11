import { TanStackDevtools } from '@tanstack/react-devtools';
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { AuthModelProvider } from '@/services/auth/model';
import { DialogController } from '@/services/dialog';
import { DevetekIntlProvider } from '@/services/i18n';
import { getLocale, loadMessages } from '@/services/i18n/usecase';
import { ModalController } from '@/services/modal';
import { SidepanelController } from '@/services/sidepanel';
import { ThemeScript } from '@/services/theme/lib/themeScript';
import { DevetekThemeModel } from '@/services/theme/model';
import { ToasterController } from '@/services/toaster';

import { AuthGuard } from '@/features/auth-guard';

import { EventsProvider } from '@/shared/libs/events';

import appCss from '../styles.css?url';

export const Route = createRootRoute({
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
        title: 'dPanel Dashboard',
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

    return {
      locale,
      messages,
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
            <AuthGuard>
              <SidepanelController />
              <ModalController />
              <DialogController />
              <ToasterController />

              <Outlet />
            </AuthGuard>
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
