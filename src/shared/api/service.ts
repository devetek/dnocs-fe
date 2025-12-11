import * as Create from './service.create';
import * as Delete$Id from './service.delete.$id';
import * as Find from './service.find';
import * as Installed from './service.installed';
import * as Origin$ServerId from './service.origin.$serverId';
import * as Origin$ServerIdDetail$ServiceName from './service.origin.$serverId.detail.$serviceName';
import * as Trigger$Name from './service.trigger.$name';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Find,
  Installed,
  Origin: {
    $ServerId: {
      ...Origin$ServerId,
      Detail: {
        $ServiceName: Origin$ServerIdDetail$ServiceName,
      },
    },
  },
  Trigger: {
    $Name: Trigger$Name,
  },
};

export default Root;
