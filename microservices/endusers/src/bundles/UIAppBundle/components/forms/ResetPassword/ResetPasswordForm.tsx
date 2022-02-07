import { useForm } from 'react-hook-form';
import { ResetPasswordInput } from 'src/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import { TextField } from '@mui/material';
import { schema } from './schema';

export type ResetPasswordFormProps = {
  onSubmit: (input: ResetPasswordInput) => Promise<void>;

  isSubmitting: boolean;
};

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, isSubmitting }) => {
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
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        type="text"
        margin="normal"
        fullWidth
        {...register('username')}
      />

      <TextField
        label="New password"
        error={Boolean(errors.newPassword)}
        helperText={errors.newPassword?.message}
        type="password"
        margin="normal"
        fullWidth
        {...register('newPassword')}
      />

      <LoadingButton sx={{ mt: 3, mb: 2 }} fullWidth variant="contained" type="submit" loading={isSubmitting}>
        Reset password
      </LoadingButton>
    </form>
  );
};
