import LogoAdminerDBM from '@/shared/assets/server-modules/module-cm-adminer.png';
import LogoMariaDB from '@/shared/assets/server-modules/module-db-mariadb.svg';
import LogoMongoDB from '@/shared/assets/server-modules/module-db-mongo.svg';
import LogoPostgreSQL from '@/shared/assets/server-modules/module-db-postgresql.svg';
import LogoRedis from '@/shared/assets/server-modules/module-db-redis.svg';
import LogoBun from '@/shared/assets/server-modules/module-pl-bun.svg';
import LogoGolang from '@/shared/assets/server-modules/module-pl-golang.svg';
import LogoNodejs from '@/shared/assets/server-modules/module-pl-nodejs.svg';
import LogoPHP from '@/shared/assets/server-modules/module-pl-php.svg';
import LogoPython from '@/shared/assets/server-modules/module-pl-python.svg';
import LogoRuby from '@/shared/assets/server-modules/module-pl-ruby.png';
import LogoCaddyServer from '@/shared/assets/server-modules/module-ut-caddyserver.svg';
import LogoDocker from '@/shared/assets/server-modules/module-ut-docker.svg';
import LogoFFMPEG from '@/shared/assets/server-modules/module-ut-ffmpeg.svg';
import LogoFrankenPHP from '@/shared/assets/server-modules/module-ut-frankenPHP.svg';

import type {
  ServerModule,
  ServerModuleCategory,
  ServerModulePlatform,
} from '../model/types';

export const HARDCODED_SERVER_MODULES: ServerModule[] = [
  {
    category: ['language'],
    platform: ['vm'],
    id: 'nodejs',
    name: 'Node.js',
    description: "JavaScript language built on Chrome's V8 JavaScript engine.",
    logoUrl: LogoNodejs,
    has_submodule: true,
  },
  {
    category: ['language'],
    platform: ['vm'],
    id: 'python',
    name: 'Python',
    description:
      'General-purpose, dynamic, high-level, and interpreted programming language.',
    logoUrl: LogoPython,
    has_submodule: true,
  },
  {
    category: ['language'],
    platform: ['vm'],
    id: 'go',
    name: 'Go',
    description:
      'Open source programming language designed for building simple, fast, reliable software.',
    logoUrl: LogoGolang,
    has_submodule: true,
  },
  {
    category: ['language'],
    platform: ['vm'],
    id: 'ruby',
    name: 'Ruby',
    description:
      'A dynamic, open source programming language with a focus on simplicity and productivity.',
    logoUrl: LogoRuby,
    has_submodule: true,
  },
  {
    category: ['language'],
    platform: ['vm'],
    id: 'bun',
    name: 'Bun',
    description:
      'Bun is an all-in-one toolkit for JavaScript and TypeScript apps.',
    logoUrl: LogoBun,
    has_submodule: true,
  },
  {
    category: ['language'],
    platform: ['vm'],
    id: 'php',
    name: 'PHP',
    description:
      'A server-side scripting language designed for web development',
    logoUrl: LogoPHP,
    has_submodule: true,
  },
  {
    category: ['database'],
    platform: ['vm'],
    id: 'redis',
    name: 'Redis',
    description:
      'Open-source in-memory data structure store, used as a database, cache, and message broker.',
    logoUrl: LogoRedis,
    has_submodule: false,
  },
  {
    category: ['database'],
    platform: ['vm'],
    id: 'mongodb',
    name: 'MongoDB',
    description: 'Open-source NoSQL database management system.',
    logoUrl: LogoMongoDB,
    has_submodule: false,
  },
  {
    category: ['database'],
    platform: ['vm'],
    id: 'mariadb',
    name: 'MariaDB',
    description: 'Open-source relational database management system.',
    logoUrl: LogoMariaDB,
    has_submodule: false,
  },
  {
    category: ['database'],
    platform: ['vm'],
    id: 'postgresql',
    name: 'PostgreSQL',
    description:
      'Free and open-source relational database management system emphasizing extensibility and SQL compliance.',
    logoUrl: LogoPostgreSQL,
    has_submodule: false,
  },
  {
    category: ['cms'],
    platform: ['vm'],
    id: 'adminer',
    name: 'Adminer',
    description:
      'Adminer is a full-featured database management tool written in PHP.',
    logoUrl: LogoAdminerDBM,
    has_submodule: false,
  },
  {
    category: ['container'],
    platform: ['vm'],
    id: 'docker',
    name: 'Docker',
    description:
      'Docker is an open-source platform that makes it easier to build, ship, and run applications.',
    logoUrl: LogoDocker,
    has_submodule: false,
  },
  {
    category: ['utilities'],
    platform: ['vm'],
    id: 'ffmpeg',
    name: 'FFMPEG',
    description:
      'FFmpeg is a free and open-source software project that produces libraries and programs for handling multimedia data.',
    logoUrl: LogoFFMPEG,
    has_submodule: false,
  },
  {
    category: ['utilities'],
    platform: ['vm'],
    id: 'frankenphp',
    name: 'FrankenPHP',
    description:
      'FrankenPHP is a PHP runtime that is designed to run PHP applications in a containerized environment.',
    logoUrl: LogoFrankenPHP,
    has_submodule: false,
  },
  {
    category: ['infrastructure'],
    platform: ['vm'],
    id: 'caddyserver',
    name: 'Caddy Server',
    description:
      'Caddy Server is a powerful, enterprise-ready, open source web server with automatic HTTPS written in Go.',
    logoUrl: LogoCaddyServer,
    has_submodule: false,
  },
];

export const SERVER_MODULES_CATEGORY: ServerModuleCategory[] = [
  {
    id: 'infrastructure',
    name: 'Infrastructure',
  },
  {
    id: 'language',
    name: 'Programming Languages Runtime',
  },
  {
    id: 'cms',
    name: 'Content Management Systems',
  },
  {
    id: 'database',
    name: 'Databases',
  },
  {
    id: 'container',
    name: 'Containers',
  },
  {
    id: 'utilities',
    name: 'Utilities',
  },
];

export const SERVER_MODULES_PLATFORM: ServerModulePlatform[] = [
  {
    id: 'vm',
    name: 'Virtual Machines',
  },
];
