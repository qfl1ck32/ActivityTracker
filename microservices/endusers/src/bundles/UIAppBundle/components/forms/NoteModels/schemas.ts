import { FieldType } from 'src/api.types';
import * as yup from 'yup';

export const createSchema = yup.object({
  name: yup.string().required(),

  fields: yup.array().of(yup.object({
    id: yup.string(),

    name: yup.string().required(),

    type: yup.string().oneOf(Object.values(FieldType)).required(),

    enumValues: yup.array().of(yup.mixed())
  })).required(),
});
