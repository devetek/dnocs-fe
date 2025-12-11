import { createStore } from 'zustand';

import buildZustandStore from '@/shared/libs/react-factories/buildZustandStore';

import type { FormActions as Actions, FormStore as Store } from './form.types';

export const [FormStoreProvider, useFormStore] = buildZustandStore(
  'ApplicationCreateForm',
  () => {
    return createStore<Store & Actions>()((set, get) => ({
      progress: '1-source',
      appDomain: '',
      appName: '',
      appProgLang: '',
      appProgLangVersion: '',
      appBuildCommand: [],
      appRunCommand: '',
      appPort: '',
      appSourceMode: 'github',
      appSourceBundleIdent: null,
      appSourceGithubRepo: null,
      hostedServerID: null,

      gitRepoConfig: null,

      dynamicConfig: null,

      setGitRepoConfig: (gitRepoConfig) => {
        set({ gitRepoConfig });
      },
      setAppDomain: (appDomain) => {
        set({ appDomain });
      },
      setAppName: (appName) => {
        set({ appName });
      },
      setAppProgLang: (appProgLang) => {
        set({ appProgLang });
      },
      setAppProgLangVersion: (appProgLangVersion) => {
        set({ appProgLangVersion });
      },
      setAppBuildCommand: (appBuildCommand) => {
        set({ appBuildCommand: [appBuildCommand] });
      },
      setAppRunCommand: (appRunCommand) => {
        set({ appRunCommand });
      },
      setAppPort: (appPort) => {
        set({ appPort });
      },
      setAppSourceMode: (appSourceMode) => {
        const { appSourceMode: prevAppSourceMode } = get();
        if (prevAppSourceMode === appSourceMode) return;

        set({
          appSourceMode,
          appSourceBundleIdent: null,
          appSourceGithubRepo: null,
        });
      },
      setAppSourceBundleIdent: (appSourceBundleIdent) => {
        set({ appSourceBundleIdent });
      },
      setAppSourceGithubRepo: (appSourceGithubRepo) => {
        set({ appSourceGithubRepo });
      },
      resetAppSourceGithubRepo: () => {
        set({ appSourceGithubRepo: null });
      },
      setHostedServerID: (hostedServerID) => {
        set({ hostedServerID });
      },
      setDynamicConfig: (dynamicConfig) => {
        set({ dynamicConfig });
      },
      setProgress: (progress) => {
        set({ progress });
      },
    }));
  },
);
