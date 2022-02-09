import { useForm } from 'react-hook-form';
import { ForgotPasswordInput } from 'src/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import { TextField } from '@mui/material';
import { schema } from './schema';
import { Form } from '../Form';

export type ForgotPasswordFormProps = {
  onSubmit: (input: ForgotPasswordInput) => Promise<void>;

  isSubmitting: boolean;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isSubmitting }) => {
  return (
    <Form
      {...{
        fields: [
          {
            name: 'email',
            label: 'Email',

            withLabel: false,
          },
        ],

        onSubmit,
        isSubmitting,
        submitButtonText: 'Send reset password e-mail',

        submitButtonFullWidth: true,
      }}
    />
  );
};
