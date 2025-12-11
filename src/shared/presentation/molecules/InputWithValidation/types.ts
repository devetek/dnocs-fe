export interface InputWithValidationProps {
  className?: string;
  classNameInput?: string;
  placeholder?: string;
  validations?: InputValidation[];

  onChange?: (value: string, error: string) => void;
  onAcceptedChange?: (value: string) => void;
}

export type InputValidation =
  | RegExp //
  | ((value: string) => true | string);
