import { useMutation } from '@apollo/client';
import { useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppFile, Mutation, UsersUpdateProfileInput, UsersUploadAvatarInput } from 'src/api.types';
import { UpdateProfile, UploadAvatar } from 'src/bundles/UIAppBundle/mutations';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { ProfileForm } from '../..';
import { DropzoneContainer, DropzoneFileType } from '../Dropzone';

export const ProfileContainer: React.FC = () => {
  const UIComponents = useUIComponents();

  const [files, setFiles] = useState<DropzoneFileType[]>([]);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);

  const [uploadAvatar] = useMutation<
    { UsersUploadAvatar: Mutation['UsersUploadAvatar'] },
    { input: UsersUploadAvatarInput }
  >(UploadAvatar);

  const [updateProfile] = useMutation<
    { UsersUpdateProfile: Mutation['UsersUpdateProfile'] },
    { input: UsersUpdateProfileInput }
  >(UpdateProfile);

  const guardian = useAppGuardian();

  const endUser = guardian.state.user.endUser;

  const profileDefaultValues = {
    firstName: endUser?.firstName,
    lastName: endUser?.lastName,
  } as Partial<UsersUpdateProfileInput>;

  const emailDefaultValues = {
    email: endUser?.email,
  } as Partial<UsersUpdateProfileInput>;

  useEffect(() => {
    if (guardian.state.user.avatar) {
      setFiles([guardian.state.user.avatar]);
    }
  }, []);

  const onUpload = async (avatar: File | null) => {
    try {
      const { data } = await uploadAvatar({
        variables: {
          input: {
            avatar,
          },
        },
      });

      const newAvatar = data?.UsersUploadAvatar as AppFile | null;

      guardian.updateState({
        user: {
          ...guardian.state.user,
          avatar: newAvatar as AppFile,
        },
      });

      setFiles(newAvatar ? [newAvatar] : []);

      toast.info(`You have successfully ${Boolean(avatar) ? 'updated' : 'removed'} your avatar.`);
    } catch (err: any) {
      toast.error(err.toString());
    }
  };

  const onUpdateProfile = async (input: UsersUpdateProfileInput) => {
    setIsUpdatingProfile(true);

    try {
      await updateProfile({
        variables: {
          input,
        },
      });

      toast.info('You have successfully updated your profile!');

      return true;
    } catch (err: any) {
      toast.error(err.toString());
      return false;
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const onUpdateEmail = async (input: Partial<UsersUpdateProfileInput>) => {
    setIsUpdatingEmail(true);

    try {
      await updateProfile({
        variables: {
          input,
        },
      });

      toast.info('You have successfully changed your e-mail!');

      return true;
    } catch (err: any) {
      toast.error(err.toString());
      return false;
    } finally {
      setIsUpdatingEmail(false);
    }
  };

  return (
    <UIComponents.Layout title="Profile">
      <Container
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <DropzoneContainer
          {...{
            files,
            setFiles,

            options: {
              accept: 'image/jpeg',
              maxFiles: 1,
            },

            onUpload,

            onRemove: () => onUpload(null),
          }}
        />

        <Container>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <ProfileForm
            {...{
              onUpdateProfile,
              isUpdatingProfile,

              onUpdateEmail,
              isUpdatingEmail,

              profileDefaultValues,
              emailDefaultValues,
            }}
          />
        </Container>
      </Container>
    </UIComponents.Layout>
  );
};
