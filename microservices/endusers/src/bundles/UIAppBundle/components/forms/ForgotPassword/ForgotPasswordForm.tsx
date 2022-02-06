import { useForm } from 'react-hook-form';
import { ForgotPasswordInput } from 'src/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import { schema } from './schema';

export type ForgotPasswordFormProps = {
  onSubmit: (input: ForgotPasswordInput) => Promise<void>;

  isSubmitting: boolean;
};

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <TextField
        label="Email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        type="text"
        margin="normal"
        fullWidth
        {...register('email')}
      />

      <LoadingButton
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        variant="contained"
        type="submit"
        loading={isSubmitting}
      >
        Send reset password e-mail
      </LoadingButton>
    </form>
  );
};
