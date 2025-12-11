import * as Create from './artifact.create';
import * as Delete$Id from './artifact.delete.$id';
import * as Find from './artifact.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
