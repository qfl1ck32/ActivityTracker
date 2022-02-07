import { gql } from '@apollo/client';

export const ActivityLogsGetAll = gql`
  {
    EndUsersActivityLogsGetAll {
      _id

      createdAt

      activity {
        name
      }

      noteModel {
        name
      }
    }
  }
`;
