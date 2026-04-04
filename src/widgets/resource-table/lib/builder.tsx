import ResourceTable from '../presentation';
import type { BuilderParams, Props } from '../rules/-types';

export function buildResourceTable<D>(params: BuilderParams<D>) {
  const { columns, contentWrapper, rowAppend, rowPrepend } = params;

  let augmentedColumns = columns;

  if (contentWrapper != null) {
    augmentedColumns = columns.map((it) => {
      if (
        typeof contentWrapper !== 'function' &&
        contentWrapper.excludedKeys.includes(it.key)
      ) {
        return it;
      }

      const { content: Content } = it;

      const Wrapper =
        typeof contentWrapper === 'function'
          ? contentWrapper
          : contentWrapper.component;

      return {
        ...it,
        content: (props) => (
          <Wrapper>
            <Content {...props} />
          </Wrapper>
        ),
      };
    });
  }

  type ConstructedProps = Omit<Props<D>, keyof BuilderParams<D>>;

  return function Constructed(props: ConstructedProps) {
    return (
      <ResourceTable
        {...props}
        columns={augmentedColumns}
        rowPrepend={rowPrepend}
        rowAppend={rowAppend}
      />
    );
  };
}
