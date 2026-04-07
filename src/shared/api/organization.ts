import * as Create from './organization.create';
import * as Delete$Id from './organization.delete.$id';
import * as Detail$IdMembers from './organization.detail.$id.members';
import * as Find from './organization.find';
import * as Update$Id from './organization.update.$id';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Detail: {
    $Id: {
      Members: Detail$IdMembers,
    },
  },
  Find,
  Update: {
    $Id: Update$Id,
  },
};

export default Root;
