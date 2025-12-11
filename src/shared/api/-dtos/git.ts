export interface GitRepositoryV1 {
  source: string;
  repo_org?: string;
  repo_name?: string;
  repo_description?: string;
  default_branch?: string;
  commit_id?: string;
  commit_message?: string;
  repo_url?: string;
  repo_framework?: string;
  repo_language?: string;
  applications?: string[];
}

export interface GitBranchV1 {
  name?: string;
  commit?: GitCommit;
  author?: GitAuthor;
  protected?: boolean;
}

export interface GitFileV1 {
  path: string;
  type?: string;
  size?: number;
  sha?: string;
  content?: string;
}

interface GitCommit {
  sha?: string;
  url?: string;
  message?: string;
}

interface GitAuthor {
  id?: number;
  login?: string;
  node_id?: string;
  avatar_url?: string;
  html_url?: string;
  gravatar_id?: string;
  type?: string;
  site_admin?: boolean;
  url?: string;
  events_url?: string;
  following_url?: string;
  followers_url?: string;
  gists_url?: string;
  organizations_url?: string;
  received_events_url?: string;
  repos_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations?: GitAuthorOrganization[];
}
interface GitAuthorOrganization {
  id?: number;
  login?: string;
}
