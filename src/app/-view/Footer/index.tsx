import { Fragment } from 'react/jsx-runtime';

const LINKS = [
  {
    text: 'Documentation',
    url: 'https://cloud.terpusat.com/docs/id/intro',
  },
  {
    text: 'GitHub',
    url: 'https://github.com/devetek',
  },
  {
    text: 'YouTube',
    url: 'https://www.youtube.com/@dpanel_id',
  },
];

export default function Footer() {
  return (
    <div className="p-2 mt-3 pt-0">
      <div className="border-t pt-6 flex justify-center gap-x-2">
        {LINKS.map((linkItem, index) => {
          return (
            <Fragment key={index}>
              <a
                className="text-primary hover:underline hover:text-accent"
                href={linkItem.url}
              >
                {linkItem.text}
              </a>
              {index < LINKS.length - 1 && <span>•</span>}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
