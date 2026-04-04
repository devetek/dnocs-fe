import { useModalEmit } from '@/services/modal/model/event';

import { iife, noop } from '@/shared/libs/browser/fn';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type {
  ActionRegistry,
  BuilderParams,
  DialogOnOpen,
  UseDialog,
} from './-rules/types';
import createDialogView from './-view';

export * as DialogBuilderRules from './-rules';

// prettier-ignore
export default function buildDialog<A extends keyof ActionRegistry, X>(params: BuilderParams<A, X>): UseDialog<A, X> {
  const { actionManualResolve } = params

  const DialogView = createDialogView<A, X>(params);

  return function useDialog() {
    const modalEmit = useModalEmit();
    
    const handleOpen = useHandler((handleOpenParams) => {
      return new Promise((resolveOuter) => {
        let isUnresolved = true;
        let currentResponse: ActionRegistry[A];
        let yieldToParent = resolveOuter;
        
        const handleClickAction = async (actionUnit: ActionRegistry[A]) => {
          currentResponse = actionUnit;

          const shouldManualResolve = iife(() => {
            if (actionManualResolve == null) {
              return false;
            }

            if (
              Array.isArray(actionManualResolve) &&
              actionManualResolve.includes(actionUnit)
            ) {
              return true;
            }

            return actionManualResolve === actionUnit;
          });

          if (!shouldManualResolve) {
            isUnresolved = false;
            yieldToParent({
              get isUnresolved() {
                return isUnresolved;
              },
              get response() {
                return currentResponse;
              },
              resolve: noop,
              reject: async () => {},
            })
            return;
          }

          await new Promise<void>((innerResolve, innerReject) => {
            yieldToParent({
              get isUnresolved() {
                return isUnresolved;
              },
              get response() {
                return currentResponse;
              },
              resolve: () => {
                isUnresolved = false;
                innerResolve();
              },
              reject: (error) => {
                innerReject(error);

                return new Promise((nextYield) => {
                  yieldToParent = (_) => nextYield();
                })
              }
            })
          })
        }

        modalEmit('%%modal/open', {
          content: (
            <DialogView
              {...handleOpenParams}
              onClickAction={handleClickAction}
              manualResolveOn={actionManualResolve}
            />
          ),
        });
      });
    }) as DialogOnOpen<A, X>;
    
    const handleCloseModal = () => {
      modalEmit('%%modal/close', null);
    };

    return [handleOpen, handleCloseModal];
  }
}
