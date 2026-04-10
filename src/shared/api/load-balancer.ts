import * as Create from './load-balancer.create';
import * as Update$IdCaseMigrateOwnership from './load-balancer.update.$id[migrate-ownership]';

const Root = {
  Create,
  Update: {
    $Id: {
      $: {
        MigrateOwnership: Update$IdCaseMigrateOwnership,
      },
    },
  },
};

export default Root;
