import { buildContext } from './buildContext';

export function buildPassthroughContext<P>(description: string) {
  return buildContext(description, (props: P) => props);
}
