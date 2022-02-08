import * as yup from 'yup';

export const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});
