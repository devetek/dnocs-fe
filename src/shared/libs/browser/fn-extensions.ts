import type { IntoEvent } from './fn-extensions.types';

declare global {
  interface Function {
    intoEvent: IntoEvent;
  }
}

(Function.prototype as any).intoEvent = function (...args: any[]) {
  const fn = this;

  return function (...innerArgs: any[]) {
    return fn(...innerArgs, ...args);
  };
};
