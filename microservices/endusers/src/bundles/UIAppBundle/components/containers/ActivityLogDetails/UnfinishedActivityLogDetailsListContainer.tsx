import { useQuery } from '@apollo/client';
import { useUIComponents } from '@bluelibs/x-ui-next';
import { Container } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { useState, Fragment, useMemo } from 'react';
import { ActivityLogDetail, Query } from 'src/api.types';
import { useActivityLog } from 'src/bundles/UIAppBundle/contexts';
import { ActivityLogDetailsGetUnfinished } from 'src/bundles/UIAppBundle/queries';
import { DataGridContainer } from '..';
import { activityLogDetailsColumns } from '../ActivityLogs/columns';

export const UnfinishedActivityLogDetailsListContainer: React.FC = () => {
  const [activityLogDetails, setActivityLogDetails] = useState<ActivityLogDetail[]>([]);

  const { loading, error } = useQuery<{
    EndUsersActivityLogDetailsGetUnfinished: Query['EndUsersActivityLogDetailsGetUnfinished'];
  }>(ActivityLogDetailsGetUnfinished, {
    onCompleted: (data) => setActivityLogDetails(data.EndUsersActivityLogDetailsGetUnfinished),
  });

  const UIComponents = useUIComponents();

  return (
    <Container>
      {loading ? (
        <UIComponents.Loader horizontalCenter verticalCenter />
      ) : (
        <Fragment>
          <DataGridContainer
            {...{
              rows: activityLogDetails,
              columns: activityLogDetailsColumns,
            }}
          />
        </Fragment>
      )}
    </Container>
  );
};
