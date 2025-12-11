import * as Create from './price-package.create';
import * as Delete$Id from './price-package.delete.$id';
import * as Detail$Id from './price-package.detail.$id';
import * as Find from './price-package.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Detail: {
    $Id: Detail$Id,
  },
  Find,
};

export default Root;
