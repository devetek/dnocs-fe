import { Line } from 'react-chartjs-2';

import { useDevetekTranslations } from '@/services/i18n';

import { formatValueUsage } from '@/entities/server-statistics/lib/formatUsage';
import type { MemoryStats } from '@/entities/server-statistics/rules/schema';

import { iife } from '@/shared/libs/browser/iife';
import { Card } from '@/shared/presentation/atoms/Card';

import { LINE_OPTIONS, generateBackgroundColor } from './_options';

export default function StatisticCardUsageRAM(props: Props) {
  const { statsDataset } = props;

  const t = useDevetekTranslations();

  const {
    usedInMB = 0,
    freeInMB = 0,
    totalInMB = 0,
  } = statsDataset.at(-1) ?? {};

  const formattedUsagePercentage = iife(() => {
    if (totalInMB <= 0) return `0%`;

    return `${((usedInMB / totalInMB) * 100).toFixed(2)}%`;
  });

  return (
    <Card className="rounded-2xl px-3 py-2 ">
      <div className="h-30 flex justify-between gap-2">
        <div className="flex flex-col items-stretch justify-between shrink-0">
          <div className="flex flex-col">
            <h5 className="text-xs font-medium">
              {t('common.terms.ramUsage')}
            </h5>
            <p className="text-xl font-bold">{formatValueUsage(usedInMB)}</p>
            <p className="text-sm font-medium">({formattedUsagePercentage})</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium">
              {t('common.terms.free')}:{' '}
              <span className="font-bold">{formatValueUsage(freeInMB)}</span>
            </p>
            <p className="text-xs font-medium">
              {t('common.terms.total')}:{' '}
              <span className="font-bold">{formatValueUsage(totalInMB)}</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-1 overflow-hidden">
          <Line
            options={LINE_OPTIONS}
            data={{
              labels: statsDataset.map((dataset) => dataset.timestamp),
              datasets: [
                {
                  label: 'Usage',
                  data: statsDataset.map((dataset) => dataset.usedInPercent),
                  borderColor: 'rgb(53, 162, 235)',
                  cubicInterpolationMode: 'monotone',
                  fill: 'start',
                  backgroundColor: generateBackgroundColor(),
                },
              ],
            }}
          />
        </div>
      </div>
    </Card>
  );
}

interface Props {
  statsDataset: MemoryStats[];
}
