import * as Create from './server.create';
import * as Delete$Id from './server.delete.$id';
import * as Detail$Id from './server.detail.$id';
import * as Detail$IdLog from './server.detail.$id.log';
import * as Find from './server.find';
import * as Origin$IdCpuUsage from './server.origin.$id.cpu.usage';
import * as Origin$IdDiskUsage from './server.origin.$id.disk.usage';
import * as Origin$IdLog from './server.origin.$id.log';
import * as Origin$IdMemoryUsage from './server.origin.$id.memory.usage';
import * as Setup$Id from './server.setup.$id';
import * as Update$Id from './server.update.$id';

const Root = {
  Create,
  Delete: {
    $Id: Delete$Id,
  },
  Detail: {
    $Id: {
      ...Detail$Id,
      Log: Detail$IdLog,
    },
  },
  Find,
  Origin: {
    $Id: {
      Cpu: {
        Usage: Origin$IdCpuUsage,
      },
      Disk: {
        Usage: Origin$IdDiskUsage,
      },
      Log: Origin$IdLog,
      Memory: {
        Usage: Origin$IdMemoryUsage,
      },
    },
  },
  Setup: {
    $Id: Setup$Id,
  },
  Update: {
    $Id: Update$Id,
  },
};

export default Root;
