export interface OrgEditSidepanelProps {
  orgId: string;
  name: string;
  description?: string;
  onSuccess?: () => void;
}
