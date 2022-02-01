import { gql } from '@apollo/client';

export const ActivityLogsGetOne = gql`
  query ($input: EndUsersActivityLogsGetOneInput!) {
    EndUsersActivityLogsGetOne(input: $input) {
      name

      activity {
        name
      }

      noteModel {
        fields {
          type

          enumValues
        }
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
