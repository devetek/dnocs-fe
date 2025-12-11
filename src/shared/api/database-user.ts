import * as Create from './database-user.create';
import * as Delete$DbUserId from './database-user.delete.$dbUserId';
import * as Find from './database-user.find';
import * as Grant$UserId from './database-user.grant.$userId';

const Root = {
  Create,
  Delete: {
    $DbUserId: Delete$DbUserId,
  },
  Find,
  Grant: {
    $UserId: Grant$UserId,
  },
};

export default Root;
