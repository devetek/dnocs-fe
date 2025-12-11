import * as Create from './price-package-consumer.create';
import * as Delete$Id from './price-package-consumer.delete.$id';
import * as Find from './price-package-consumer.find';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
