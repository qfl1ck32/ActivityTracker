import { gql } from '@apollo/client';

export const UpdateProfile = gql`
  mutation ($input: EndUsersUpdateProfileInput!) {
    EndUsersUpdateProfile(input: $input) {
      _id
    }
  }
`;
