import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { EndUsersUpdateProfileInput, UserProfileInput } from 'src/api.types';
import { LoadingButton } from '../..';
import { schema } from './schema';

export type ProfileFormProps = {
  onSubmit: (data: EndUsersUpdateProfileInput) => Promise<void>;

  isSubmitting: boolean;

  defaultValues?: Partial<UserProfileInput>;
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isSubmitting, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      <div>
        <TextField
          label="First name"
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
          type="text"
          margin="normal"
          fullWidth
          {...register('firstName')}
        />
      </div>

      <div>
        <TextField
          label="Last name"
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
          type="text"
          margin="normal"
          fullWidth
          {...register('lastName')}
        />
      </div>

      <LoadingButton variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth type="submit" loading={isSubmitting}>
        Update
      </LoadingButton>
    </form>
  );
};
