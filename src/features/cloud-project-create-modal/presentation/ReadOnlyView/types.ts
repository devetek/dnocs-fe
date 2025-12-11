export interface ReadOnlyViewProps {
  data: Record<string, unknown>;
}

export interface ROItemProps {
  label: string;
  value: string;
  isHidden?: boolean;
}
