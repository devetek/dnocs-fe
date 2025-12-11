import type { ReactNode } from 'react';

import { CrownIcon, ShieldIcon, ZapIcon } from 'lucide-react';

import { useAuthLoggedIn } from '@/services/auth';

import { ApiPricePackageConsumer, DTOs } from '@/shared/api';
import { capitalizeEveryFirstLetter } from '@/shared/libs/browser/string';
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

const subscriptionInfo = {
  features: [],
};

function Container(props: { children: ReactNode }) {
  return (
    <Card className="rounded-2xl flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CrownIcon className="h-5 w-5 text-yellow-500" />
          Subscription Package
        </CardTitle>
        <CardDescription>
          Your current plan and billing information
        </CardDescription>
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
    return <FailedState.WallCentered errorPayload={response.error.message} />;
  }

  if (response.$status !== 'success') {
    return (
      <div className="w-full flex justify-center">
        <Spinner />
      </div>
    );
  }

  const payments = response.price_package_consumers ?? [];
  const paidPayment = payments.length > 0 ? payments[0] : null;
  const pkgName = paidPayment?.price_package.name ?? '';
  const pkgCurrency = paidPayment?.price_package.currency ?? 'IDR';
  const pkgPrice = paidPayment?.price_package.price ?? 0;
  const paymentStatus = paidPayment?.payment_status ?? 'Unknown';
  const nextPayment = paidPayment?.subscribe_at ?? '';

  if (!paidPayment) {
    return (
      <Container>
        <FailedState.WallCentered errorPayload={'No active subscription!'} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            {pkgName}
            <Badge variant="secondary" className="bg-green-900 text-green-300">
              <ShieldIcon className="h-3 w-3 mr-1" />
              {capitalizeEveryFirstLetter(paymentStatus)}
            </Badge>
          </h3>
          <p className="text-2xl font-bold text-yellow-500">
            {pkgCurrency.toLocaleUpperCase()} {pkgPrice.toLocaleString('id-ID')}
            /month
          </p>
        </div>
        <Button variant="outline">Manage Subscription</Button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-400 mb-2">
          Next billing date: {nextPayment}
        </p>
      </div>

      {subscriptionInfo.features.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Plan Features:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {subscriptionInfo.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <ZapIcon className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
