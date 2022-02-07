import { gql } from '@apollo/client';

export const ActivityLogDetailsFragment = gql`
  fragment ActivityLogDetailsFragment on ActivityLogDetail {
    _id

    createdAt

    note {
      _id
      value
    }

    timing {
      _id

      startedAt
      finishedAt

      isFinished
    }
  }
`;
