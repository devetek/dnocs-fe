import * as Delete$Id from './router.delete.$id';
import * as Detail$Id from './router.detail.$id';
import * as Find from './router.find';

const Root = {
  Detail: {
    $Id: Detail$Id,
  },
  Delete: {
    $Id: Delete$Id,
  },
  Find,
};

export default Root;
