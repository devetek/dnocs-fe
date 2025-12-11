import type { DTOs } from '@/shared/api';

export interface UserFormModalProps {
  action: 'create' | 'update';
  user: DTOs.User;
  onSubmitSuccess?: () => void;
}
