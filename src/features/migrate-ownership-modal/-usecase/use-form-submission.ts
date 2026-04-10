import { useToaster } from '@/services/toaster';

import type { DTOs } from '@/shared/api';
import {
  ApiApplication,
  ApiCloud,
  ApiDomain,
  ApiLoadBalancer,
  ApiSecret,
  ApiServer,
} from '@/shared/api';
import { iife } from '@/shared/libs/browser/fn';

import { usePropsModel } from '../-models';
import { useEmit, useSubscribe } from '../-models/events';
import { useMigrateOwnershipForm } from '../-models/form';

export default function useFormSubmissionUsecase() {
  const [openToaster] = useToaster();

  const emit = useEmit();

  const { mod, onSuccess } = usePropsModel();

  const form = useMigrateOwnershipForm();

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const response = await iife(() => {
        const payload: DTOs.PayloadUpdateOwnership =
          values.newTeamId === '0'
            ? { into: 'personal' }
            : { into: 'team', teamId: values.newTeamId };

        switch (mod.type) {
          case 'server':
            return ApiServer.Update.$Id.$.MigrateOwnership.doPost({
              serverId: mod.moduleId,
              payload,
            });

          case 'application':
            return ApiApplication.Update.$Id.$.MigrateOwnership.doPost({
              applicationId: mod.moduleId,
              payload,
            });

          case 'load-balancer':
            return ApiLoadBalancer.Update.$Id.$.MigrateOwnership.doPost({
              loadBalancerId: mod.moduleId,
              payload,
            });

          case 'domain':
            return ApiDomain.Update.$Id.$.MigrateOwnership.doPost({
              domainId: mod.moduleId,
              payload,
            });

          case 'cloud-project':
            return ApiCloud.Project.Update.$Id.$.MigrateOwnership.doPost({
              cloudProjectId: mod.moduleId,
              payload,
            });

          case 'secret-ssh':
            return ApiSecret.SshKey.Update.$Id.$.MigrateOwnership.doPost({
              sshKeyId: mod.moduleId,
              payload,
            });

          default:
            throw Error('Unsupported mod type');
        }
      });

      if (response.$status === 'success') {
        openToaster({
          variant: 'success',
          message: 'Ownership migrated successfully',
        });
        emit('#migrate-ownership-modal/modal-close');
        onSuccess?.();
        return;
      }

      throw response.error;
    } catch (error) {
      openToaster({
        variant: 'error',
        message: 'Failed to migrate ownership',
      });
      return;
    }
  });

  useSubscribe('#migrate-ownership-modal/form-submit', () => {
    handleSubmit();
  });
}
