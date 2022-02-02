import { gql } from '@apollo/client';

export const ActivityLogDetailsFragment = gql`
  fragment ActivityLogDetailsFragment on ActivityLogDetails {
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
`;
