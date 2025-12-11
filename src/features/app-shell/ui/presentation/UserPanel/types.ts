export interface UserPanelProps {
  userData: UserData;
  onClickViewProfile?: () => void;
  onClickLogout?: () => void;
}

export interface UserData {
  avatarUrl: string;
  username: string;
  userEmail: string;
}
