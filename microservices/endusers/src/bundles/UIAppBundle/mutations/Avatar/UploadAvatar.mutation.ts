import { gql } from '@apollo/client';

export const UploadAvatar = gql`
  mutation ($input: UsersUploadAvatarInput!) {
    UsersUploadAvatar(input: $input) {
      downloadUrl
    }
  }
`;
