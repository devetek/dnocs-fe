export interface SubmoduleSectionProps {
  submoduleVersion: string;
  submoduleSummaries: SubmoduleSummary[];
  inProgress?: boolean;

  onClickDelete?: () => void;
}

export interface SubmoduleSummary {
  label: string;
  value: string;
}
