import * as Create from './organization.create';
import * as Delete$Id from './organization.delete.$id';
import * as Find from './organization.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
