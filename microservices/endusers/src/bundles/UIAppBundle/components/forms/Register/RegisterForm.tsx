import { useForm } from 'react-hook-form';
import { EndUsersRegisterInput } from 'src/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import { TextField } from '@mui/material';
import { schema } from './schema';
import { Form } from '../Form';

export type RegisterFormProps = {
  onSubmit: (input: EndUsersRegisterInput) => Promise<void>;

  isSubmitting: boolean;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <Form
      {...{
        fields: [
          {
            name: 'firstName',
            label: 'First name',
            withLabel: false,

            isRequired: true,
          },
          {
            name: 'lastName',
            label: 'Last name',
            withLabel: false,

            isRequired: true,
          },
          {
            name: 'email',
            label: 'Email',
            withLabel: false,

            type: 'email',

            isRequired: true,
          },
          {
            name: 'password',
            label: 'Password',
            withLabel: false,

            type: 'password',

            isRequired: true,
          },
        ],

        onSubmit,
        isSubmitting,

        submitButtonText: 'Sign up',
      }}
    />
  );
};
