const openCodeEditor = (language?: string): PreviewConfig => ({
  kind: 'code',
  language,
});

export type PreviewConfig =
  | { kind: 'code'; language?: string }
  | { kind: 'image-blob' }; // TODO

export const FILEMATCH_REGISTRY: Record<string, PreviewConfig> = {
  // Web
  '\\.m?jsx?$': openCodeEditor('javascript'),
  '\\.(d\\.)?m?tsx?$': openCodeEditor('typescript'),
  '\\.(ht|x)ml$': openCodeEditor('xml'),
  '\\.(s?css|less)$': openCodeEditor('css'),
  // Programming Language
  '\\.py$': openCodeEditor('python'),
  '\\.java$': openCodeEditor('java'),
  '\\.cs$': openCodeEditor('csharp'),
  '\\.go$': openCodeEditor('go'),
  '\\.rs$': openCodeEditor('rust'),
  '\\.php$': openCodeEditor('php'),
  '\\.rb$': openCodeEditor('ruby'),
  '\\.swift$': openCodeEditor('swift'),
  '\\.kt$': openCodeEditor('kotlin'),
  '\\.pl$': openCodeEditor('perl'),
  '\\.(c|h|cpp|hpp)$': openCodeEditor('cpp'),
  // Scripting & Config
  '\\.(sh|bash|zsh)$': openCodeEditor('bash'),
  '\\.(sql)$': openCodeEditor(),
  '\\.(md)$': openCodeEditor('markdown'),
  '\\.(json)$': openCodeEditor('json'),
  '.gitignore': openCodeEditor(),
  '\\.ya?ml$': openCodeEditor('yaml'),
  '\\.toml$': openCodeEditor('ini'),
  '\\.env(\\.example)?$': openCodeEditor('ini'),
  LICENSE: openCodeEditor('markdown'),
  Dockerfile: openCodeEditor('bash'),
};
