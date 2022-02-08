import { useMutation } from '@apollo/client';
import { useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Container, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AppFile, EndUsersUpdateProfileInput, Mutation, UsersUploadAvatarInput } from 'src/api.types';
import { UpdateProfile, UploadAvatar } from 'src/bundles/UIAppBundle/mutations';
import { useAppGuardian } from 'src/bundles/UIAppBundle/services';
import { ProfileForm } from '../..';
import { DropzoneContainer, DropzoneFileType } from '../Dropzone';

export const ProfileContainer: React.FC = () => {
  const UIComponents = useUIComponents();

  const [files, setFiles] = useState<DropzoneFileType[]>([]);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [uploadAvatar] = useMutation<
    { UsersUploadAvatar: Mutation['UsersUploadAvatar'] },
    { input: UsersUploadAvatarInput }
  >(UploadAvatar);

  const [updateProfile] = useMutation<
    { EndUsersUpdateProfile: Mutation['EndUsersUpdateProfile'] },
    { input: EndUsersUpdateProfileInput }
  >(UpdateProfile);

  const guardian = useAppGuardian();

  const endUser = guardian.state.user.endUser;

  const profileDefaultValues = {
    firstName: endUser?.firstName,
    lastName: endUser?.lastName,
  } as EndUsersUpdateProfileInput;

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

      setFiles(newAvatar ? [newAvatar] : []);

      toast.info(`You have successfully ${Boolean(avatar) ? 'updated' : 'removed'} your avatar.`);
    } catch (err: any) {
      toast.error(err.toString());
    }
  };

  useEffect(() => {
    if (guardian.state.user.avatar) {
      setFiles([guardian.state.user.avatar]);
    }
  }, []);

  const onUpdateProfile = async (input: EndUsersUpdateProfileInput) => {
    setIsUpdatingProfile(true);

    try {
      await updateProfile({
        variables: {
          input,
        },
      });

      // TODO: await guardian.load()??

      toast.info('You have successfully updated your profile!');
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsUpdatingProfile(false);
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
        <Box>
          <Typography component="h1" variant="h5">
            Avatar
          </Typography>
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
        </Box>

        <Box>
          <Typography component="h1" variant="h5">
            Profile
          </Typography>
          <ProfileForm
            {...{
              onSubmit: onUpdateProfile,
              isSubmitting: isUpdatingProfile,
              defaultValues: profileDefaultValues,
            }}
          />
        </Box>
      </Container>
    </UIComponents.Layout>
  );
};
