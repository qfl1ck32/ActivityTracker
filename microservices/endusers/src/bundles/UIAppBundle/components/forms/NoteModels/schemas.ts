import { FieldType } from 'src/api.types';
import * as yup from 'yup';

export const createSchema = yup.object({
  name: yup.string().required(),
});
