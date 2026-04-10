import * as SshKeyCreate from './secret.ssh-key.create';
import * as SshKeyDelete$Id from './secret.ssh-key.delete.$id';
import * as SshKeyDetail$Id from './secret.ssh-key.detail.$id';
import * as SshKeyFind from './secret.ssh-key.find';
import * as SshKeyUpdate$IdCaseMigrateOwnership from './secret.ssh-key.update.$id[migrate-ownership]';

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
    Update: {
      $Id: {
        $: {
          MigrateOwnership: SshKeyUpdate$IdCaseMigrateOwnership,
        },
      },
    },
  },
};

export default Root;
