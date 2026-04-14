import type { ReactNode } from 'react';

import { CalendarClockIcon, CheckCircle2Icon, CrownIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiPricePackageConsumer, DTOs } from '@/shared/api';
import { capitalizeEveryFirstLetter } from '@/shared/libs/browser/string';
import { Badge } from '@/shared/presentation/atoms/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/presentation/atoms/Card';
import { Separator } from '@/shared/presentation/atoms/Separator';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

function Container(props: { children: ReactNode }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CrownIcon className="h-4 w-4 text-yellow-500" />
          Subscription Package
        </CardTitle>
        <CardDescription>Your current plan and billing information</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}

export default function Subscription() {
  const { userProfile } = useAuthLoggedIn();
  const [response] = ApiPricePackageConsumer.Find.useGet({
    userId: userProfile.id,
    paymentStatus: DTOs.PaymentStatus.Paid,
    page: 1,
    pageSize: 1,
  });

  if (response.$status === 'failed') {
    return (
      <Container>
        <FailedState.WallCentered errorPayload={response.error.message} />
      </Container>
    );
  }

  if (response.$status !== 'success') {
    return (
      <Container>
        <div className="flex justify-center py-4">
          <Spinner />
        </div>
      </Container>
    );
  }

  const payments = response.price_package_consumers ?? [];
  const paidPayment = payments.length > 0 ? payments[0] : null;

  if (!paidPayment) {
    return (
      <Container>
        <FailedState.WallCentered errorPayload="No active subscription." />
      </Container>
    );
  }

  const pkgName = paidPayment.price_package.name ?? '';
  const pkgCurrency = (paidPayment.price_package.currency ?? 'IDR').toUpperCase();
  const pkgPrice = paidPayment.price_package.price ?? 0;
  const paymentStatus = paidPayment.payment_status ?? 'Unknown';
  const nextPayment = paidPayment.subscribe_at ?? '';

  return (
    <Container>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-base">{pkgName}</p>
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2Icon className="h-3 w-3" />
              {capitalizeEveryFirstLetter(paymentStatus)}
            </Badge>
          </div>
          <p className="text-2xl font-bold text-yellow-500">
            {pkgCurrency}{' '}
            {pkgPrice.toLocaleString('id-ID')}
            <span className="text-sm font-normal text-muted-foreground">/month</span>
          </p>
        </div>
      </div>

      {nextPayment && (
        <>
          <Separator className="my-4" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarClockIcon className="h-4 w-4 shrink-0" />
            <span>Next billing date: <span className="text-foreground font-medium">{nextPayment}</span></span>
          </div>
        </>
      )}
    </Container>
  );
}
