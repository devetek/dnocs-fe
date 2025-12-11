import * as Create from './price-package-item.create';
import * as Delete$Id from './price-package-item.delete.$id';
import * as Find from './price-package-item.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
