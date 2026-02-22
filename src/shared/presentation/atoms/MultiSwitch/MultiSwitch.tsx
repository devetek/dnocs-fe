import { cn } from '@/shared/libs/tailwind/cn';

/**
 * @deprecated use SegmentedControls instead
 */
export default function MultiSwitch<S extends string = string>(
  props: MultiSwitchProps<S>,
) {
  const { classNameWrapper, activeId, items, onClickItem } = props;

  const handleClickItem = (item: SwitchItem<S>) => {
    return () => {
      onClickItem?.(item);
    };
  };

  if (items.length < 1) return null;

  // SAFETY: items.length is checked above, so items[0] is guaranteed to exist.
  // @ts-expect-error
  const activeItemId = activeId || items[0].id;

  const cnWrapper = cn(
    'bg-secondary rounded-md p-1 flex gap-1',
    classNameWrapper,
  );

  return (
    <div className={cnWrapper}>
      {items.map((item) => {
        const { id, text } = item;

        const cnButton = cn('rounded-sm cursor-pointer px-2 py-1', {
          'bg-card shadow-xs border': activeItemId === id,
        });

        const cnText = cn(
          'text-sm',
          activeItemId === id ? 'text-foreground' : 'text-foreground/50',
        );

        return (
          <button key={id} className={cnButton} onClick={handleClickItem(item)}>
            <p className={cnText}>{text}</p>
          </button>
        );
      })}
    </div>
  );
}

export interface MultiSwitchProps<S extends string> {
  classNameWrapper?: string;
  activeId?: S;
  items: Array<SwitchItem<S>>;
  onClickItem?: (item: SwitchItem<S>) => void;
}

export interface SwitchItem<S extends string> {
  id: S;
  text: string;
}
