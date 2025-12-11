import * as Origin$ServerId from './folder.origin.$serverId';
import * as Origin$ServerIdContent from './folder.origin.$serverId.content';

const Root = {
  Origin: {
    $ServerId: {
      ...Origin$ServerId,
      Content: Origin$ServerIdContent,
    },
  },
};

export default Root;
