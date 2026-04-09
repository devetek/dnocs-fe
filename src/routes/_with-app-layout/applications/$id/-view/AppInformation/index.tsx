import {
  BookOpenIcon,
  BoxIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  HammerIcon,
  InfoIcon,
  PlayIcon,
  TerminalIcon,
} from 'lucide-react';

import { iife } from '@/shared/libs/browser/fn';
import { capitalizeFirstLetter } from '@/shared/libs/browser/string';
import {
  couple,
  guardedSelects,
} from '@/shared/libs/react-factories/guardedSelect';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/presentation/atoms/Accordion';
import { Badge } from '@/shared/presentation/atoms/Badge';
import { Card } from '@/shared/presentation/atoms/Card';
import { Spinner } from '@/shared/presentation/atoms/Spinner';
import CardSectionTitled from '@/shared/presentation/molecules/CardSectionTitled';

import { useAppDataModel } from '../../-model/app-data';

import { AppInformationStates as UIStates } from './_States';

const [guard, useAppDetail] = guardedSelects({
  initialIsLoading: true,
  fallbackLoading: UIStates.Loading,
  fallbackError: UIStates.Loading,
})(couple(useAppDataModel, (s) => s.appDetail));

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{children}</p>;
}

function InfoRow({ label, value, link }: { label: string; value: React.ReactNode; link?: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <SectionLabel>{label}</SectionLabel>
      {link ? (
        <a href={link} target="_blank" rel="noreferrer" className="flex items-center gap-1 group">
          <span className="text-sm font-medium group-hover:underline truncate">{value}</span>
          <ExternalLinkIcon className="size-3 shrink-0 text-muted-foreground" />
        </a>
      ) : (
        <p className="text-sm font-medium">{value ?? <span className="text-muted-foreground italic">—</span>}</p>
      )}
    </div>
  );
}

function EnvTable({ envs }: { envs: { key: string; value?: string }[] }) {
  if (envs.length === 0) {
    return <p className="text-xs text-muted-foreground italic">No environment variables</p>;
  }

  return (
    <div className="flex flex-col gap-1">
      {envs.map((env) => (
        <div key={env.key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-2 text-xs font-mono bg-muted/50 rounded px-2 py-1">
          <span className="text-primary font-semibold truncate">{env.key}</span>
          <span className="text-muted-foreground truncate">{env.value ?? '••••••'}</span>
        </div>
      ))}
    </div>
  );
}

function StepsList({ steps }: { steps: { name: string; command?: string[] }[] }) {
  if (steps.length === 0) {
    return <p className="text-xs text-muted-foreground italic">No build steps</p>;
  }

  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1">
            <span className="size-4 rounded-full bg-muted text-muted-foreground text-[10px] flex items-center justify-center font-bold shrink-0">{i + 1}</span>
            <span className="text-xs font-semibold truncate">{step.name}</span>
          </div>
          {step.command && step.command.length > 0 && (
            <div className="ml-5 flex flex-col gap-0.5">
              {step.command.map((cmd, j) => (
                <code key={j} className="text-[11px] bg-muted rounded px-1.5 py-0.5 font-mono truncate block">{cmd}</code>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default guard(function AppInformation() {
  const [appSource, appIdentity] = useAppDetail((s) => [s.identity.source, s.identity]);
  const configDefs = useAppDetail((s) => s.configDefs);
  const [gitDetail] = useAppDataModel((s) => [s.gitDetail]);

  const lifecycle = configDefs?.lifecycle;

  const repoInfo = iife(() => {
    if (gitDetail.$status !== 'success') return null;
    return {
      org: gitDetail.repo_org!,
      name: gitDetail.repo_name!,
      url: gitDetail.repo_url!,
      language: gitDetail.repo_language,
      framework: gitDetail.repo_framework,
    };
  });

  const isLoadingGit = gitDetail.$status === 'loading';

  const defaultOpenItems = iife(() => {
    const open = ['git'];
    if (lifecycle?.build) open.push('build');
    if (lifecycle?.run) open.push('run');
    return open;
  });

  return (
    <CardSectionTitled placement="aside" title="App Details" icon={InfoIcon}>
      <div className="w-full">
        <Accordion type="multiple" defaultValue={defaultOpenItems} className="w-full">

          {/* ── Git Repository ── */}
          {appSource === 'repository' && (
            <AccordionItem value="git" className="border-b-0 border-t">
              <AccordionTrigger className="px-4 py-2.5 text-sm font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                  <GitBranchIcon className="size-4 text-muted-foreground" />
                  Repository
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex flex-col gap-3">
                  {isLoadingGit ? (
                    <Spinner className="size-4" />
                  ) : repoInfo ? (
                    <>
                      <InfoRow
                        label="Repository"
                        value={`${repoInfo.org} / ${repoInfo.name}`}
                        link={repoInfo.url}
                      />
                      <div className="grid grid-cols-2 gap-3">
                        {repoInfo.language && (
                          <InfoRow
                            label="Language"
                            value={
                              <Badge variant="secondary" className="text-xs w-max">
                                {capitalizeFirstLetter(repoInfo.language)}
                              </Badge>
                            }
                          />
                        )}
                        {repoInfo.framework && (
                          <InfoRow
                            label="Framework"
                            value={
                              <Badge variant="secondary" className="text-xs w-max">
                                {capitalizeFirstLetter(repoInfo.framework)}
                              </Badge>
                            }
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No repository linked</p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ── Build ── */}
          {lifecycle?.build && (
            <AccordionItem value="build" className="border-b-0 border-t">
              <AccordionTrigger className="px-4 py-2.5 text-sm font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                  <HammerIcon className="size-4 text-muted-foreground" />
                  Build
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex flex-col gap-4">
                  {lifecycle.setup?.languages[0] && (
                    <InfoRow
                      label="Language Version"
                      value={
                        <Badge variant="outline" className="text-xs w-max font-mono">
                          {lifecycle.setup.languages[0].name} {lifecycle.setup.languages[0].version}
                        </Badge>
                      }
                    />
                  )}

                  <div className="flex flex-col gap-1.5">
                    <SectionLabel>Build Steps</SectionLabel>
                    <StepsList steps={lifecycle.build.steps} />
                  </div>

                  {lifecycle.build.envs.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel>Environment Variables</SectionLabel>
                      <EnvTable envs={lifecycle.build.envs} />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ── Run ── */}
          {lifecycle?.run && (
            <AccordionItem value="run" className="border-b-0 border-t">
              <AccordionTrigger className="px-4 py-2.5 text-sm font-semibold hover:no-underline">
                <div className="flex items-center gap-2">
                  <PlayIcon className="size-4 text-muted-foreground" />
                  Run
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <InfoRow label="Service Name" value={lifecycle.run.name} />
                    <InfoRow label="Port" value={lifecycle.run.port} />
                  </div>

                  {lifecycle.run.command && (
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel>Command</SectionLabel>
                      <code className="text-[11px] bg-muted rounded px-2 py-1.5 font-mono break-all">
                        {lifecycle.run.command}
                      </code>
                    </div>
                  )}

                  {lifecycle.run.envs.length > 0 && (
                    <div className="flex flex-col gap-1.5">
                      <SectionLabel>Environment Variables</SectionLabel>
                      <EnvTable envs={lifecycle.run.envs} />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          {/* ── Fallback jika tidak ada data lifecycle ── */}
          {!lifecycle && appSource !== 'repository' && (
            <div className="px-4 py-3 flex flex-col items-center gap-2 text-center">
              <BoxIcon className="size-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">No configuration available</p>
            </div>
          )}

        </Accordion>
      </div>
    </CardSectionTitled>
  );
});

