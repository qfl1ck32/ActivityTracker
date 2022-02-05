import { gql } from '@apollo/client';

export const ActivityLogDetailsDelete = gql`
  mutation ($input: EndUsersActivityLogDetailsDeleteInput!) {
    EndUsersActivityLogDetailsDelete(input: $input)
  }
`;
