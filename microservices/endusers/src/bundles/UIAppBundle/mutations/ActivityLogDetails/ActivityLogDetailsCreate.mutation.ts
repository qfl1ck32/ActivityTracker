import { gql } from '@apollo/client';
import { ActivityLogDetailsFragment } from '../../fragments';

export const ActivityLogDetailsCreate = gql`
  ${ActivityLogDetailsFragment}

  mutation ($input: EndUsersActivityLogDetailsCreateInput!) {
    EndUsersActivityLogDetailsCreate(input: $input) {
      ...ActivityLogDetailsFragment
    }
  }
`;
