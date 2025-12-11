import * as Find from './user.find';
import * as Profile from './user.profile';
import * as Update$Id from './user.update.$id';

const Root = {
  Find,
  Profile,
  Update: {
    $Id: Update$Id,
  },
};

export default Root;
