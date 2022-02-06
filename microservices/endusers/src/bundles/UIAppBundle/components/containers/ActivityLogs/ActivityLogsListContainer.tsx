import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { Container } from '@mui/material';
import { GridColumns, GridEventListener, GridEvents } from '@mui/x-data-grid';
import { Fragment, useEffect, useState } from 'react';
import { ActivityLog, Query } from 'src/api.types';
import { Routes } from 'src/bundles/UIAppBundle';
import { ActivityLogCreatedEvent, IActivityLogCreated } from 'src/bundles/UIAppBundle/events';
import { ActivityLogsGetAll } from 'src/bundles/UIAppBundle/queries';
import { ActivityLogsCreateContainer, DialogContainer } from '../..';
import { DataGridContainer } from '../DataGrid';

const columns: GridColumns = [
  {
    field: 'name',
    headerName: 'Name',

    width: 250,
  },

  {
    field: 'activity',
    headerName: 'Activity Name',

    width: 250,

    renderCell: (params) => params.value.name,
  },

  {
    field: 'noteModel',
    headerName: 'Note Model Name',

    width: 250,

    renderCell: (params) => params.value.name,
  },

  {
    field: 'createdAt',
    headerName: 'Created At',

    width: 250,

    valueFormatter: (params) => new Date(params.value as number).toLocaleDateString(),
  },
];

export const ActivityLogsListContainer: React.FC = () => {
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  const [createDialogIsOpened, setCreateDialogIsOpened] = useState(false);

  const UIComponents = useUIComponents();
  const router = useRouter();

  const { loading, error } = useQuery<{ EndUsersActivityLogsGetAll: Query['EndUsersActivityLogsGetAll'] }>(
    ActivityLogsGetAll,
    {
      onCompleted: (data) => setActivityLogs(data.EndUsersActivityLogsGetAll),
    }
  );

  const eventManager = useEventManager();

  useEffect(() => {
    const listener: EventHandlerType<IActivityLogCreated> = (e) => {
      setActivityLogs((prev) => prev.concat(e.data.activityLog));
    };

    eventManager.addListener(ActivityLogCreatedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogCreatedEvent as any, listener); // TODO: fix from bluelibs
    };
  }, []);

  if (error) return <UIComponents.Error error={error} />;

  const onRowClick: GridEventListener<GridEvents.rowClick> = (row) => {
    router.go(Routes.ActivityLog, {
      params: {
        id: row.id,
      },
    });
  };

  const onDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <Container>
      {loading ? (
        <UIComponents.Loader />
      ) : (
        <Fragment>
          <DataGridContainer
            {...{
              rows: activityLogs,
              columns,
              onRowClick,
              onDelete,
              toolbarProps: {
                onCreatePress: () => setCreateDialogIsOpened(true),
              },
            }}
          />

          <DialogContainer
            {...{
              open: createDialogIsOpened,
              onClose: () => setCreateDialogIsOpened(false),
              title: 'Create activity log',
            }}
          >
            <ActivityLogsCreateContainer />
          </DialogContainer>
        </Fragment>
      )}
    </Container>
  );
};
