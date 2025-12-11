import * as Detail$RepoOrg$RepoName from './git-repository.detail.$repoOrg.$repoName';
import * as Find from './git-repository.find';

const Root = {
  Detail: {
    $RepoOrg: {
      $RepoName: Detail$RepoOrg$RepoName,
    },
  },
  Find,
};

export default Root;
