import { gql } from '@apollo/client';

export const ActivityLogsCreate = gql`
  mutation ($input: EndUseresActivityLogsCreateInput!) {
    EndUsersActivityLogsCreate(input: $input) {
      _id

      name

      activity {
        name
      }

      noteModel {
        name
      }

      createdAt
    }
  }
`;
