import { Line } from 'react-chartjs-2';

import { useDevetekTranslations } from '@/services/i18n';

import type { CpuStats } from '@/entities/server-statistics/rules/schema';

import { Card } from '@/shared/presentation/atoms/Card';

import { LINE_OPTIONS, generateBackgroundColor } from './_options';

export default function StatisticCardUsageCPU(props: Props) {
  const { coreCount, datasets } = props;

  const t = useDevetekTranslations();

  const cpuUsage = (datasets.at(-1)?.usedInPercent || 0).toFixed(2);

  return (
    <Card className="rounded-2xl px-3 py-2">
      <div className="h-30 flex justify-between gap-2">
        <div className="flex flex-col items-stretch justify-between shrink-0">
          <div className="flex flex-col">
            <h5 className="text-xs font-medium">
              {t('common.terms.cpuUsage')}
            </h5>
            <p className="text-2xl font-bold">{cpuUsage}%</p>
          </div>

          <div className="flex flex-col">
            <p className="text-xs font-medium">
              {t('common.terms.coreCount')}:{' '}
              <span className="font-bold">{coreCount}</span>
            </p>
          </div>
        </div>

        <div className="flex shrink-1 overflow-hidden">
          <Line
            options={LINE_OPTIONS}
            data={{
              labels: datasets.map((dataset) => dataset.timestamp),
              datasets: [
                {
                  label: 'Usage',
                  data: datasets.map((dataset) => dataset.usedInPercent),
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
  coreCount: number;
  datasets: CpuStats[];
}
