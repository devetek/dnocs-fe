import * as Create from './load-balancer.create';
import * as Update$IdCaseMigrateOwnership from './load-balancer.update.$id[migrate-ownership]';
import * as Update$IdCaseRestore from './load-balancer.update.$id[restore]';

const Root = {
  Create,
  Update: {
    $Id: {
      $: {
        MigrateOwnership: Update$IdCaseMigrateOwnership,
        Restore: Update$IdCaseRestore,
      },
    },
  },
};

export default Root;
