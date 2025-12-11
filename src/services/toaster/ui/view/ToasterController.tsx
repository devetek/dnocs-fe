import type { JSX } from 'react';
import { useRef, useState } from 'react';

import { useToasterSubscribe } from '../../model/toasterEvent';
import type { ToasterItem } from '../../rules/types';
import { ToasterCard, ToasterContainer } from '../presentation/Toaster';

export default function ToasterController(): JSX.Element {
  const [toasterList, setToasterList] = useState<ToasterItem[]>([]);

  const refTimeouts = useRef<number[]>([]);

  useToasterSubscribe('%%toaster/push', (options) => {
    setToasterList((prev) => [...prev, options]);

    refTimeouts.current.push(
      window.setTimeout(() => {
        setToasterList((prev) => prev.slice(1));

        clearTimeout(refTimeouts.current[0]);
        refTimeouts.current.shift();
      }, options.duration || 3000),
    );
  });

  useToasterSubscribe('%%toaster/clear-all', () => {
    refTimeouts.current.forEach((timeout) => {
      clearTimeout(timeout);
    });

    refTimeouts.current = [];

    setToasterList([]);
  });

  const handleClickClose = (index: number) => {
    return () => {
      setToasterList((prev) => prev.filter((_, i) => i !== index));

      clearTimeout(refTimeouts.current[index]);
      refTimeouts.current.splice(index, 1);
    };
  };

  return (
    <ToasterContainer>
      {toasterList.map((toastItem, index) => {
        const { title, message, variant } = toastItem;

        return (
          <ToasterCard
            key={index}
            title={title}
            message={message}
            variant={variant || 'info'}
            onClickClose={handleClickClose(index)}
          />
        );
      })}
    </ToasterContainer>
  );
}
