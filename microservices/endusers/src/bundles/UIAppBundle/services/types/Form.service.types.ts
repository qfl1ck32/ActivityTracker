import { HTMLInputTypeAttribute } from 'react';

export type FormFieldEnumValueType = {
  name: string;
  value: string;
};

export type FormFieldType = {
  name: string;
  label: string;

  type?: HTMLInputTypeAttribute;
  enumValues?: string[] | FormFieldEnumValueType[];
  enumValuePlaceholder?: string;

  isRequired?: boolean | number;

  nest?: FormFieldType[];

  multiline?: boolean;

  withLabel?: boolean;
};
