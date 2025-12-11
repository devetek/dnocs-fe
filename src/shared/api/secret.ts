import * as SshKeyCreate from './secret.ssh-key.create';
import * as SshKeyDelete$Id from './secret.ssh-key.delete.$id';
import * as SshKeyDetail$Id from './secret.ssh-key.detail.$id';
import * as SshKeyFind from './secret.ssh-key.find';

const Root = {
  SshKey: {
    Create: SshKeyCreate,
    Detail: {
      $Id: SshKeyDetail$Id,
    },
    Delete: {
      $Id: SshKeyDelete$Id,
    },
    Find: SshKeyFind,
  },
};

export default Root;
