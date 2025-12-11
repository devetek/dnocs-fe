import type { ReactNode } from 'react';

import {
  SiCss,
  SiDotenv,
  SiGit,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiMarkdown,
  SiNpm,
  SiPnpm,
  SiReact,
  SiSvg,
  SiToml,
  SiTypescript,
  SiYaml,
} from '@icons-pack/react-simple-icons';
import type { LucideProps } from 'lucide-react';
import { BracesIcon, ScaleIcon } from 'lucide-react';

type Icon = (props: LucideProps) => ReactNode;

export const KNOWN_FILE_ICONS_FROM_NAME: Record<string, Icon | undefined> = {
  '.env': SiDotenv,
  LICENSE: ScaleIcon,

  // Git-related
  '.gitkeep': SiGit,
  '.gitignore': SiGit,

  // NPM-related
  'package.json': SiNpm,
  'package-lock.json': SiNpm,

  // PNPM-related
  'pnpm-lock.yaml': SiPnpm,
};

export const KNOWN_FILE_ICONS_FROM_EXT: Record<string, Icon | undefined> = {
  // Linux
  sh: SiGnubash,

  // Web
  svg: SiSvg,
  css: SiCss,
  html: SiHtml5,

  // JS - TS - React
  tsx: SiReact,
  jsx: SiReact,
  ts: SiTypescript,
  cjs: SiJavascript,
  mjs: SiJavascript,
  js: SiJavascript,

  md: SiMarkdown,

  // Config
  json: BracesIcon,
  yaml: SiYaml,
  yml: SiYaml,
  toml: SiToml,
};
