export interface CustomSelectProps {
  title?: string;
  dropdownItemsList?: string[];
  dropdownItemName?: string;
  placeholder?: string;
  className?: string;
  triggerClassName?: string;
  downloadIcon?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  textClassname?: string;
  isActionsDisabled?: boolean;
  selectItemClassName?: string;
}
