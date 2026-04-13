import type { ResourceCardFullExpandableProps as Props } from '../../rules/types/variant-full';

export default function RCDExpandable(props: Props) {
  const { children } = props;

  return <div className="w-full">{children}</div>;
}
