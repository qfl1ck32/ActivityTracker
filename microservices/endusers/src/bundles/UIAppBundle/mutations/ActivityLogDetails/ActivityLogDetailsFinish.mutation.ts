import { gql } from '@apollo/client';
import { ActivityLogDetailsFragment } from '../../fragments';

export const ActivityLogDetailsFinish = gql`
  ${ActivityLogDetailsFragment}

  mutation ($input: EndUsersActivityLogDetailsFinishInput!) {
    EndUsersActivityLogDetailsFinish(input: $input) {
      ...ActivityLogDetailsFragment
    }
  }
`;
