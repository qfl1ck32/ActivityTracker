import { Field } from 'src/api.types';

export type ActivityNoteDetailNoteValueType = {
  value: any;

  translatedValue: any;

  field: Field;
};

export type ActivityNoteDetailNoteValuesType = Record<string, ActivityNoteDetailNoteValueType>;
