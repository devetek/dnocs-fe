import * as Delete$Id from './application.delete.$id';
import * as Detail$Id from './application.detail.$id';
import * as Find from './application.find';
import * as Update$Id from './application.update.$id';

const Root = {
  Delete: {
    $Id: Delete$Id,
  },
  Detail: {
    $Id: Detail$Id,
  },
  Find,
  Update: {
    $Id: Update$Id,
  },
};

export default Root;
