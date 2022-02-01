import { gql } from '@apollo/client';

export const ActivitiesGetAll = gql`
  {
    EndUsersActivitiesGetAll {
      _id
      name
    }
  }
`;
