export interface SearchCollapsibleProps {
  initialValue?: string;
  placeholderText?: string;
  onClickClear?: () => void;
  onSubmit?: (value: string, from: 'blur' | 'enter') => void;
}
