import { Fragment } from 'react';

import { Link } from '@tanstack/react-router';
import { ChevronRightIcon } from 'lucide-react';

import type { BreadcrumbProps } from './types';

export default function Breadcrumb(props: BreadcrumbProps) {
  const { items } = props;

  return (
    <span className="flex items-center gap-1">
      {items.map((item, index) => {
        let element = <></>;

        if (item.url) {
          element = <Link to={item.url}>{item.text}</Link>;
        } else {
          element = <span className="pointer-events-none">{item.text}</span>;
        }

        return (
          <Fragment key={index}>
            {element}
            {index !== items.length - 1 && (
              <ChevronRightIcon className="w-4 h-4" />
            )}
          </Fragment>
        );
      })}
    </span>
  );
}
