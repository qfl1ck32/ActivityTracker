import { gql } from '@apollo/client';

export const UpdateProfile = gql`
  mutation ($input: UsersUpdateProfileInput!) {
    UsersUpdateProfile(input: $input)
  }
`;
