import { gql } from '@apollo/client';

export const ActivitiesFind = gql`
  {
    ActivitiesFind {
      _id
      name
    }
  }
`;
