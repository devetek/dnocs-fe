import * as Create from './price-name.create';
import * as Delete$Id from './price-name.delete.$id';
import * as Find from './price-name.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
