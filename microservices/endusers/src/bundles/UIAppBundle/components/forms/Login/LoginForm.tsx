import { useForm } from 'react-hook-form';
import { LoginInput } from 'src/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { LoadingButton } from '../../';
import { TextField } from '@mui/material';

export type LoginFormProps = {
  onSubmit: (input: LoginInput) => Promise<void>;

  isSubmitting: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting }) => {
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
        label="Username"
        error={Boolean(errors.username)}
        helperText={errors.username?.message}
        type="text"
        margin="normal"
        fullWidth
        {...register('username')}
      />

      <TextField
        label="Password"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        type="password"
        margin="normal"
        fullWidth
        {...register('password')}
      />

      <LoadingButton variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth type="submit" loading={isSubmitting}>
        Login
      </LoadingButton>
    </form>
  );
};
