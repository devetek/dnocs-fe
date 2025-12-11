import * as Detail$RepoOrg$RepoName from './git-branch.detail.$repoOrg.$repoName';
import * as Find from './git-branch.find';

const Root = {
  Detail: {
    $RepoOrg: {
      $RepoName: Detail$RepoOrg$RepoName,
    },
  },
  Find,
};

export default Root;
