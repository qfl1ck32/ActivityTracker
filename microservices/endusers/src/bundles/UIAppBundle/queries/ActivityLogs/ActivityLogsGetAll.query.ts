import { gql } from '@apollo/client';

export const ActivityLogsGetAll = gql`
  {
    EndUsersActivityLogsGetAll {
      _id
      name

      activity {
        name
      }

      noteModel {
        name
      }
    }
  }
`;
