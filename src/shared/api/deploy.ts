import * as Create from './deploy.create';
import * as Delete$Id from './deploy.delete.$id';
import * as Find from './deploy.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
