import { useForm } from 'react-hook-form';
import { EndUsersRegisterInput } from 'src/api.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import { TextField } from '@mui/material';
import { schema } from './schema';

export type RegisterFormProps = {
  onSubmit: (input: EndUsersRegisterInput) => Promise<void>;

  isSubmitting: boolean;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isSubmitting }) => {
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
        label="First name"
        error={Boolean(errors.firstName)}
        helperText={errors.firstName?.message}
        type="text"
        margin="normal"
        fullWidth
        {...register('firstName')}
      />

      <TextField
        label="Last name"
        error={Boolean(errors.lastName)}
        helperText={errors.lastName?.message}
        type="text"
        margin="normal"
        fullWidth
        {...register('lastName')}
      />

      <TextField
        label="Email"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
        type="email"
        margin="normal"
        fullWidth
        {...register('email')}
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
        Register
      </LoadingButton>
    </form>
  );
};
