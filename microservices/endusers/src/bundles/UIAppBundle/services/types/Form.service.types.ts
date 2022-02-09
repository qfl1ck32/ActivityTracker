import { HTMLInputTypeAttribute } from 'react';

export type FormFieldType = {
  name: string;
  label: string;

  type: HTMLInputTypeAttribute;
  enumValues?: string[];
  isRequired?: boolean | number;

  nest?: FormFieldType[];
};
