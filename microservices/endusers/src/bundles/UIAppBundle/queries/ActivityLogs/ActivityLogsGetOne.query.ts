import { gql } from '@apollo/client';

export const ActivityLogsGetOne = gql`
  query ($input: EndUsersActivityLogsGetOneInput!) {
    EndUsersActivityLogsGetOne(input: $input) {
      name

      activity {
        name
      }

      details {
        name

        note {
          _id
          value
        }

        timing {
          _id

          startedAt
          finishedAt
        }
      }
    }
  }
`;
