import { gql } from '@apollo/client';

export const ActivityNotesUpdate = gql`
  mutation ($input: EndUsersActivityNotesUpdateInput!) {
    EndUsersActivityNotesUpdate(input: $input) {
      activityLogDetailId

      value
    }
  }
`;
