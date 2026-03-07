import { registerModal } from '@/services/modal';

import { iife, noop } from '@/shared/libs/browser/iife';
import useHandler from '@/shared/libs/react-hooks/useHandler';

import type {
  BuildDialogReturnHook,
  DialogActionUnit as DAUnit,
  DialogActions,
  DialogController,
  DialogHookOnOpen,
  BuildDialogParams as Params,
} from './-rules';
import createDialogView from './-view';

// prettier-ignore
export default function buildDialog<AUnit extends DAUnit<'yes-no'>>(
  params: Params<'yes-no'>,
): BuildDialogReturnHook<'yes-no', AUnit>;

// prettier-ignore
export default function buildDialog<AUnit extends DAUnit<'ok-cancel'>>(
  params: Params<'ok-cancel'>,
): BuildDialogReturnHook<'ok-cancel', AUnit>;

export default function buildDialog<AUnit extends DAUnit<'ok'>>(
  params: Params<'ok'>,
): BuildDialogReturnHook<'ok', AUnit>;

export default function buildDialog<
  A extends DialogActions,
  AUnit extends DAUnit<A>,
>(params: Params<A>): BuildDialogReturnHook<A, AUnit> {
  const useRegisteredModal = registerModal(createDialogView<A, AUnit>(params));

  return function useDialog() {
    const [openModal, closeModal] = useRegisteredModal();

    const handleOpen: DialogHookOnOpen<A, AUnit> = useHandler(
      (handleOpenParams) => {
        const { manualResolveOn } = handleOpenParams ?? {};

        return new Promise((resolveOuter) => {
          openModal({
            manualResolveOn,
            onClickAction: async (actionUnit) => {
              const shouldManualResolve = iife(() => {
                if (manualResolveOn == null) {
                  return false;
                }

                if (
                  Array.isArray(manualResolveOn) &&
                  manualResolveOn.includes(actionUnit)
                ) {
                  return true;
                }

                return manualResolveOn === actionUnit;
              });

              if (!shouldManualResolve) {
                resolveOuter([actionUnit, { resolve: noop, reject: noop }]);
                return;
              }

              await new Promise<void>((innerResolve, innerReject) => {
                const controller: DialogController = {
                  resolve: () => innerResolve(),
                  reject: (error: Error) => innerReject(error),
                };

                resolveOuter([actionUnit, controller]);
              });
            },
          });
        });
      },
    );

    return [handleOpen, closeModal];
  };
}
