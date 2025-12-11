import type { ReactNode } from 'react';

export default function generateChunkLinks(link: string) {
  return function Link(chunks: ReactNode) {
    return (
      <a
        className="hover:underline text-blue-700 dark:text-blue-300"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {chunks}
      </a>
    );
  };
}
