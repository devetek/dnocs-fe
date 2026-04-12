import { useLbDetailsModel } from '../../models/lb-details';

import L7RuleRow from './L7RuleRow';

export default function RouteRules() {
  const [details] = useLbDetailsModel((s) => [s.details]);

  if (details.$status !== 'success') return null;

  const { configuration } = details;

  if (configuration.lbKind === 'l4') {
    return (
      <div className="flex flex-col w-full gap-y-1">
        <h5 className="text-xs font-bold text-primary">UPSTREAM RULES</h5>

        <div className="w-full bg-background inset-shadow-sm rounded-md p-3 flex flex-col gap-y-2">
          {configuration.upstreams.map((upstream, index) => (
            <div
              key={index}
              className="bg-card/30 border shadow-xs rounded-sm overflow-hidden px-3.5 py-2.5"
            >
              <code className="font-semibold text-primary text-sm">
                {upstream.address}:<span className="opacity-70">{upstream.port}</span>
              </code>
            </div>
          ))}
        </div>
      </div>
    );
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
