import { FieldType } from 'src/api.types';
import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required(),

  type: yup.string().oneOf(Object.values(FieldType)).required(),

  enumValues: yup.array().of(yup.string()).notRequired(),
});
