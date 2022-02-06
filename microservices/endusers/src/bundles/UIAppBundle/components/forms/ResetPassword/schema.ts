import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string().required(),

  newPassword: yup.string().required(),
});
