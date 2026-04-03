import * as Origin$ServerId from './folder.origin.$serverId';
import * as Origin$ServerIdContent from './folder.origin.$serverId.content';
import * as Origin$ServerIdWatch from './folder.origin.$serverId.watch';

const Root = {
  Origin: {
    $ServerId: {
      ...Origin$ServerId,
      Content: Origin$ServerIdContent,
      Watch: Origin$ServerIdWatch,
    },
  },
};

export default Root;
