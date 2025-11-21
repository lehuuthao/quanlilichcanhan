export interface ParamsLayoutType {
  token: string;
}

export interface ParamsPageType {
  params: { token: string };
}

export interface DropdownOption {
  name: string;
  value: string;
}
export interface FormFieldRef {
  validate: () => boolean;
}
