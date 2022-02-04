import { gql } from '@apollo/client';
import { ActivityLogDetailsFragment } from '../../fragments';

export const ActivityLogsGetOne = gql`
  ${ActivityLogDetailsFragment}

  query ($input: EndUsersActivityLogsGetOneInput!) {
    EndUsersActivityLogsGetOne(input: $input) {
      _id

      name

      activity {
        name
      }

      noteModel {
        fields {
          id
          name

          type

          enumValues {
            id

            value
          }
        }
      }

      details {
        ...ActivityLogDetailsFragment
      }
    }
  }
`;
