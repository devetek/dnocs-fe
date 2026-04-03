import type { ReactNode } from 'react';

import { ExternalLinkIcon, ReceiptIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiPricePackageConsumer } from '@/shared/api';
import { Badge } from '@/shared/presentation/atoms/Badge';
import { Button } from '@/shared/presentation/atoms/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import { FailedState } from '@/widgets/failed-state';

function Container(props: { children: ReactNode }) {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ReceiptIcon className="h-4 w-4" />
          Order History
        </CardTitle>
        <CardDescription>Your recent purchases and billing history</CardDescription>
      </CardHeader>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
}

export default function LastSubscriptions() {
  const { userProfile } = useAuthLoggedIn();
  const [response] = ApiPricePackageConsumer.Find.useGet({
    userId: userProfile.id,
    page: 1,
    pageSize: 5,
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

  if (!payments.length) {
    return (
      <Container>
        <FailedState.WallCentered errorPayload="No subscription history." />
      </Container>
    );
  }

  return (
    <Container>
      <div className="divide-y">
        {payments.map((payment) => {
          const pkgName = payment.price_package.name ?? '';
          const paymentStatus = payment.payment_status ?? 'Unknown';
          const paymentUrl = payment.payment_token?.redirect_url ?? '';
          const createdAt = payment.created_at;
          const settlementTime = payment.payment_data?.settlement_time ?? '';

          return (
            <div
              key={payment.id}
              className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-medium text-sm truncate">{pkgName}</p>
                  <Badge variant="secondary" className="shrink-0 text-xs">
                    {paymentStatus}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {createdAt}{settlementTime ? ` · Settled ${settlementTime}` : ''}
                </p>
              </div>

              {paymentUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                  onClick={() => window.open(paymentUrl, '_blank')}
                >
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
