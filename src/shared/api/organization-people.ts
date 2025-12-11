import * as Create from './organization-people.create';
import * as Delete$Id from './organization-people.delete.$id';
import * as Find from './organization-people.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
