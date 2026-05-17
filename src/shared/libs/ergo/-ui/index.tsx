import type { ComponentType, RefObject } from 'react';
import React, { createRef } from 'react';

import type { WithChildren } from '@/shared/libs/types/react';

import type {
  OnUpdateMetadata,
  OnUpdateParams,
  WithErgoViewStates,
} from '../-rules/types';

export function withErgo(states: WithErgoViewStates | null) {
  const ErgoGuard = createErgoGuard();

  return <P extends {}>(Content: ComponentType<P>) => {
    return (props: P) => {
      return (
        <ErgoGuard {...states}>
          <Content {...props} />
        </ErgoGuard>
      );
    };
  };
}

function createErgoGuard() {
  type Props = WithChildren & WithErgoViewStates;

  type States = {
    thrown?: {
      (onUpdate: (params: OnUpdateParams) => void): () => void;
      meta: OnUpdateMetadata;
    };
    meta: OnUpdateMetadata;
  };

  return class ErgoGuard_INTERNAL extends React.Component<Props, States> {
    refCleanup: RefObject<(() => void) | null>;

    constructor(props: Props) {
      super(props);
      this.state = {
        meta: {
          $: 'data',
        },
      };

      this.refCleanup = createRef<() => void>();
    }

    componentDidMount(): void {
      this.setupThrown();
    }

    componentDidUpdate(): void {
      this.setupThrown();
    }

    componentWillUnmount(): void {
      if (this.refCleanup.current == null) return;
      this.refCleanup.current();
    }

    setupThrown = () => {
      if (this.state.thrown == null) return;
      const registerUpdater = this.state.thrown;
      this.setState({ thrown: undefined });

      this.refCleanup.current = registerUpdater(this.onUpdate);
    };

    onUpdate = (params: OnUpdateParams) => {
      this.setState({
        meta: params.getMetadata(),
      });
    };

    static getDerivedStateFromError(thrown: unknown): States {
      if (typeof thrown === 'function') {
        const castedThrown = thrown as NonNullable<States['thrown']>;

        return {
          meta: castedThrown.meta,
          thrown: castedThrown,
        };
      }

      throw thrown;
    }

    render() {
      const { meta } = this.state;
      const { loading: Loading, error: FailedError, children } = this.props;

      if (meta.$ === 'loading') {
        return Loading ? <Loading /> : null;
      }

      if (meta.$ === 'error') {
        return FailedError ? <FailedError {...meta.error} /> : null;
      }

      return children;
    }
  };
}

const filteredLogger = (instance: (...params: unknown[]) => void) => {
  return (...params: unknown[]) => {
    const joined = params.join('\n');

    const FILTERED = ['ErgoGuard_INTERNAL'];

    if (FILTERED.find((it) => joined.includes(it)) != null) {
      return;
    }

    instance(...params);
  };
};

console.log = filteredLogger(console.log);
console.debug = filteredLogger(console.debug);
console.error = filteredLogger(console.error);
