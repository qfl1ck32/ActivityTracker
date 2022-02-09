import { LoginInput } from 'src/api.types';
import { FormFieldType } from 'src/bundles/UIAppBundle/services/types';
import { Form } from '../Form';

export type LoginFormProps = {
  onSubmit: (input: LoginInput) => Promise<void>;

  isSubmitting: boolean;
};

const loginFormFields = [
  {
    name: 'username',
    label: 'Username',
    isRequired: true,

    withLabel: false,
  },
  {
    name: 'password',
    label: 'Password',
    isRequired: true,

    type: 'password',

    withLabel: false,
  },
] as FormFieldType[];

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <Form
      {...{
        onSubmit,
        isSubmitting,
        fields: loginFormFields,
        submitButtonText: 'Login',
      }}
    />
  );
};
