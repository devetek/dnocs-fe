export const KNOWN_FILE_DESC_FROM_NAME: Record<string, string | undefined> = {
  dockerfile: 'Dockerfile',
  '.dockerignore': 'Docker Ignore',
  '.gitignore': 'Git Ignore',
  '.gitattributes': 'Git Attributes',
  '.editorconfig': 'EditorConfig',
  makefile: 'Makefile',
  readme: 'README',
  license: 'License',
  'tsconfig.json': 'TypeScript Config',
  'package.json': 'Node Package Manifest',
  'package-lock.json': 'NPM Lockfile',
  'yarn.lock': 'Yarn Lockfile',
  'pnpm-lock.yaml': 'PNPM Lockfile',
  'bun.lockb': 'Bun Lockfile',
  '.eslintrc': 'ESLint Config',
  '.eslintrc.json': 'ESLint Config',
  '.prettierrc': 'Prettier Config',
  '.prettierrc.json': 'Prettier Config',
  '.nvmrc': 'Node Version',
  '.env': 'Environment Variables',
  '.env.local': 'Environment Variables',
};

export const KNOWN_FILE_DESC_FROM_EXT: Record<string, string | undefined> = {
  // code
  js: 'JavaScript',
  mjs: 'JavaScript Module',
  cjs: 'CommonJS Module',
  ts: 'TypeScript',
  jsx: 'React JSX',
  tsx: 'React TSX',
  vue: 'Vue Component',
  svelte: 'Svelte Component',
  py: 'Python',
  rb: 'Ruby',
  php: 'PHP',
  java: 'Java',
  kt: 'Kotlin',
  go: 'Go',
  rs: 'Rust',
  cs: 'C#',
  c: 'C Source',
  h: 'C/C++ Header',
  cpp: 'C++ Source',
  hpp: 'C++ Header',
  swift: 'Swift',
  dart: 'Dart',
  lua: 'Lua',
  r: 'R Script',
  sh: 'Shell Script',
  bash: 'Bash Script',
  ps1: 'PowerShell Script',

  // web & styles
  html: 'HTML Document',
  css: 'CSS Stylesheet',
  scss: 'SCSS Stylesheet',
  less: 'Less Stylesheet',

  // data & config
  json: 'JSON File',
  ndjson: 'NDJSON File',
  yaml: 'YAML File',
  yml: 'YAML File',
  toml: 'TOML File',
  ini: 'INI Config',
  env: 'Env File',
  xml: 'XML File',
  graphql: 'GraphQL Schema',
  gql: 'GraphQL Schema',
  proto: 'Protocol Buffers',
  avsc: 'Avro Schema',
  prisma: 'Prisma Schema',

  // docs
  md: 'Markdown',
  rst: 'reStructuredText',
  adoc: 'AsciiDoc',
  txt: 'Text File',
  pdf: 'PDF Document',

  // data science / notebooks
  ipynb: 'Jupyter Notebook',
  parquet: 'Parquet Data',
  feather: 'Feather Data',
  arrow: 'Arrow IPC',

  // databases
  sql: 'SQL Script',

  // archives & packages
  zip: 'ZIP Archive',
  tar: 'TAR Archive',
  gz: 'GZIP Archive',
  bz2: 'BZip2 Archive',
  xz: 'XZ Archive',
  tgz: 'Tarball (tgz)',
  rar: 'RAR Archive',

  // node/ecosystem extras
  lock: 'Lockfile',
  map: 'Source Map',

  // keep only the most popular media for dev assets
  png: 'PNG Image',
  svg: 'Scalable Vector Graphic',
};
