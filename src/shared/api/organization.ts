import * as Create from './organization.create';
import * as Delete$Id from './organization.delete.$id';
import * as Find from './organization.find';
import * as Update$Id from './organization.update.$id';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
  Update: {
    $Id: Update$Id,
  },
};

export default Root;
