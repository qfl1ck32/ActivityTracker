import { gql } from '@apollo/client';
import { ActivityLogDetailsFragment } from '../../fragments';

export const ActivityLogDetailsGetUnfinished = gql`
  ${ActivityLogDetailsFragment}

  {
    EndUsersActivityLogDetailsGetUnfinished {
      activityLog {
        activity {
          name
        }
      }

      ...ActivityLogDetailsFragment
    }
  }
`;
