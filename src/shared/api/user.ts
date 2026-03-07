import * as Find from './user.find';
import * as Login from './user.login';
import * as Profile from './user.profile';
import * as Register from './user.register';
import * as Update$Id from './user.update.$id';

const Root = {
  Find,
  Login,
  Profile,
  Register,
  Update: {
    $Id: Update$Id,
  },
};

export default Root;
