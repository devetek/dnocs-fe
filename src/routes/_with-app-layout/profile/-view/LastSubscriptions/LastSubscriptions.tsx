import type { ReactNode } from 'react';

import { Receipt } from 'lucide-react';

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
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Receipt className="h-5 w-5" />
          Order History
        </CardTitle>
        <CardDescription>
          Your recent purchases and billing history
        </CardDescription>
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
    pageSize: 3,
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
        <div className="w-full flex justify-center">
          <Spinner />
        </div>
      </Container>
    );
  }

  const payments = response.price_package_consumers ?? [];

  if (!payments.length) {
    return (
      <Container>
        <FailedState.WallCentered errorPayload={'No subscription history!'} />
      </Container>
    );
  }

  const handleOnClickPay = (url: string) => {
    return () => {
      window.open(url, '_blank');
    };
  };

  return (
    <Container>
      <div className="space-y-4">
        {payments.map((payment) => {
          const paymentId = payment.id;
          const pkgName = payment.price_package.name ?? '';
          const paymentCreateAt = payment.created_at;
          const paymentDate = payment.payment_data?.settlement_time ?? '';
          const paymentStatus = payment.payment_status ?? 'Unknown';
          const paymentUrl = payment.payment_token?.redirect_url ?? '';

          return (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-sm">{pkgName}</h4>
                  <Badge
                    variant="secondary"
                    className="bg-green-900 text-green-300 text-xs"
                  >
                    {paymentStatus}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span>Order #{paymentId}</span>
                  <span>{paymentCreateAt}</span>
                  <span>Paid with {paymentDate}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-sm">
                  {payment.created_at}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs text-gray-400 hover:text-white"
                  onClick={handleOnClickPay(paymentUrl)}
                >
                  View Details
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="mt-6 pt-4 border-t border-gray-700">
          <Button variant="outline" className="w-full bg-transparent" size="sm">
            View All Orders
          </Button>
        </div> */}
    </Container>
  );
}
