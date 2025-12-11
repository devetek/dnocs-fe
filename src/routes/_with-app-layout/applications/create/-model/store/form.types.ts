export interface FormStore {
  progress: Progress;

  appSourceMode: AppSourceMode;
  appSourceBundleIdent: string | null;
  appSourceGithubRepo: string | null;

  hostedServerID: number | null;

  appName: string;
  appDomain: string;
  appProgLang: string;
  appProgLangVersion: string;
  appBuildCommand: string[];
  appRunCommand: string;
  appPort: string;

  gitRepoConfig: Record<string, string> | null;

  dynamicConfig: Record<string, Record<string, unknown>> | null;
}

export interface FormActions {
  setProgress: (progress: Progress) => void;
  setAppSourceMode: (appSourceMode: AppSourceMode) => void;
  setAppSourceBundleIdent: (appSourceBundleIdent: string) => void;
  setAppSourceGithubRepo: (appSourceGithubRepo: string) => void;
  resetAppSourceGithubRepo: () => void;

  setHostedServerID: (hostedServerID: number) => void;

  setGitRepoConfig: (gitRepoConfig: FormStore['gitRepoConfig']) => void;
  setAppName: (appName: string) => void;
  setAppDomain: (appDomain: string) => void;
  setAppProgLang: (appProgLang: string) => void;
  setAppProgLangVersion: (appProgLangVersion: string) => void;
  setAppBuildCommand: (appBuildCommand: string) => void;
  setAppRunCommand: (appRunCommand: string) => void;
  setAppPort: (appPort: string) => void;

  setDynamicConfig: (dynamicConfig: FormStore['dynamicConfig']) => void;
}

export type AppSourceMode = 'bundle' | 'github';

export type Progress =
  | '1-source'
  | '2-details'
  | '3-configuration'
  | '4-deploy';
