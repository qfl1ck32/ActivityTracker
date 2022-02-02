import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { GridColumns, GridEventListener, GridEvents } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { ActivityLog, Query } from 'src/api.types';
import { Routes } from 'src/bundles/UIAppBundle';
import { ActivityLogCreatedEvent, IActivityLogCreated } from 'src/bundles/UIAppBundle/events';
import { ActivityLogsGetAll } from 'src/bundles/UIAppBundle/queries';
import { DataGridContainer } from '../DataGrid';

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 300,
  },

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

  if (loading) return <UIComponents.Loading />;

  if (error) return <UIComponents.Error error={error} />;

  const onCellClick: GridEventListener<GridEvents.cellClick> = (gridCell) => {
    if (gridCell.field !== 'id') return;

    router.go(Routes.ActivityLog, {
      params: {
        id: gridCell.id,
      },
    });
  };

  const onDelete = async (id: string) => {
    console.log(id);
  };

  return <DataGridContainer {...{ rows: activityLogs, columns, onCellClick, onDelete }} />;
};
