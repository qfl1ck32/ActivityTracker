import { Box, Divider } from '@mui/material';
import { UserProfileInput, UsersUpdateProfileInput } from 'src/api.types';
import { FormFieldType } from 'src/bundles/UIAppBundle/services/types';
import { Form } from '../Form';

export type ProfileFormProps = {
  onUpdateProfile: (data: UsersUpdateProfileInput) => Promise<boolean>;
  onUpdateEmail: (data: UsersUpdateProfileInput) => Promise<boolean>;

  isUpdatingProfile: boolean;
  isUpdatingEmail: boolean;

  profileDefaultValues?: Partial<UserProfileInput>;

  emailDefaultValues?: Partial<UserProfileInput>;
};

const profileFormFields = [
  {
    name: 'firstName',
    label: 'First name',
    isRequired: true,
    type: 'text',
  },
  {
    name: 'lastName',
    label: 'Last name',
    isRequired: true,
    type: 'text',
  },
] as FormFieldType[];

const emailFormFields = [
  {
    name: 'email',
    label: 'Email',
    isRequired: true,
    type: 'email',
  },
] as FormFieldType[];

export const ProfileForm: React.FC<ProfileFormProps> = ({
  onUpdateEmail,
  onUpdateProfile,
  isUpdatingEmail,
  isUpdatingProfile,
  profileDefaultValues,
  emailDefaultValues,
}) => {
  return (
    <Box>
      <Form
        {...{
          onSubmit: onUpdateProfile,
          fields: profileFormFields,
          isSubmitting: isUpdatingProfile,
          defaultValues: profileDefaultValues,
          submitButtonText: 'Update',
        }}
      />

      <Divider />

      <Form
        {...{
          onSubmit: onUpdateEmail,
          fields: emailFormFields,
          isSubmitting: isUpdatingEmail,
          defaultValues: emailDefaultValues,
          submitButtonText: 'Change e-mail',
        }}
      />
    </Box>
  );
};
