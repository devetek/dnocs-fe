import * as ProjectCreate from './cloud.project.create';
import * as ProjectDelete$Id from './cloud.project.delete.$id';
import * as ProjectFind from './cloud.project.find';
import * as Regions$Id from './cloud.regions.$id';
import * as Vpcs$Id from './cloud.vpcs.$id';

const Root = {
  Project: {
    Create: ProjectCreate,
    Delete: {
      $Id: ProjectDelete$Id,
    },
    Find: ProjectFind,
  },
  Regions: {
    $Id: Regions$Id,
  },
  Vpcs: {
    $Id: Vpcs$Id,
  },
};

export default Root;
