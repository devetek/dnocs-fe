import * as ProjectCreate from './cloud.project.create';
import * as ProjectDelete$Id from './cloud.project.delete.$id';
import * as ProjectFind from './cloud.project.find';
import * as ProjectOstemplates$Id from './cloud.project.ostemplates.$id';
import * as ProjectUpdate$IdCaseMigrateOwnership from './cloud.project.update.$id[migrate-ownership]';
import * as Regions$Id from './cloud.regions.$id';
import * as Vpcs$Id from './cloud.vpcs.$id';

const Root = {
  Project: {
    Create: ProjectCreate,
    Delete: {
      $Id: ProjectDelete$Id,
    },
    Find: ProjectFind,
    Ostemplates: {
      $Id: ProjectOstemplates$Id,
    },
    Update: {
      $Id: {
        $: {
          MigrateOwnership: ProjectUpdate$IdCaseMigrateOwnership,
        },
      },
    },
  },
  Regions: {
    $Id: Regions$Id,
  },
  Vpcs: {
    $Id: Vpcs$Id,
  },
};

export default Root;
