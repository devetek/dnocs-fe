import * as Detail$RepoOrg$RepoName from './git-file.detail.$repoOrg.$repoName';
import * as Find from './git-file.find';

const Root = {
  Detail: {
    $RepoOrg: {
      $RepoName: Detail$RepoOrg$RepoName,
    },
  },
  Find,
};

export default Root;
