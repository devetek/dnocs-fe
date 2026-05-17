import type { ComponentType, RefObject } from 'react';
import React, { createRef } from 'react';

import type { WithChildren } from '@/shared/libs/types/react';

import { THROW_MARKER } from '../-config';
import type {
  OnUpdateMetadata,
  OnUpdateParams,
  ThrownObject,
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
    // thrown?: {
    //   (onUpdate: (params: OnUpdateParams) => void): () => void;
    //   meta: OnUpdateMetadata;
    // };
    registerUpdate?: ThrownObject['registerUpdate'];
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
      if (this.state.registerUpdate == null) return;
      const registerUpdater = this.state.registerUpdate;
      this.setState({ registerUpdate: undefined });

      this.refCleanup.current = registerUpdater(this.onUpdate);
    };

    onUpdate = (params: OnUpdateParams) => {
      this.setState({
        meta: params.getMetadata(),
      });
    };

    static getDerivedStateFromError(thrown: unknown): States {
      const check =
        typeof thrown === 'object' &&
        thrown != null &&
        '__marker' in thrown &&
        thrown.__marker === THROW_MARKER;

      if (check) {
        const { meta, registerUpdate } = thrown as ThrownObject;

        return {
          meta,
          registerUpdate,
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
    for (const param in params) {
      if (typeof param === 'string' && param.includes('ErgoGuard_INTERNAL')) {
        return;
      }
    }

    instance(...params);
  };
};

console.error = filteredLogger(console.error);
