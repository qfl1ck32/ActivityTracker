import { gql } from '@apollo/client';

export const ActivityLogsGetAll = gql`
  {
    EndUsersActivityLogsGetAll {
      _id

      name

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
