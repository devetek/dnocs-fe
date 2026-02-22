import { useLbDetailsModel } from '../../models/lb-details';

import L7RuleRow from './L7RuleRow';

export default function RouteRules() {
  const [details] = useLbDetailsModel((s) => [s.details]);

  if (details.$status !== 'success') return null;

  const { configuration } = details;

  if (configuration.lbKind !== 'l7') {
    throw Error('TODO!');
  }

  return (
    <div className="flex flex-col w-full gap-y-1">
      <h5 className="text-xs font-bold text-primary">UPSTREAM RULES</h5>

      <div className="w-full bg-background inset-shadow-sm rounded-md p-3 flex flex-col gap-y-2">
        {configuration.rules.map((configRule) => {
          return <L7RuleRow upstreamRule={configRule.upstream} />;
        })}
      </div>
    </div>
  );
}
