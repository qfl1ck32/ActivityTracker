import { useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Button, Typography } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { cloneDeep } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import {
  ActivityLog, ActivityNote,
  ActivityTiming,
  EndUsersActivityLogsGetOneInput, Query
} from 'src/api.types';
import { useActivityLog } from 'src/bundles/UIAppBundle/contexts';
import { ActivityLogDetailCreatedEvent, ActivityNoteUpdatedEvent, IActivityLogDetailCreated, IActivityNoteUpdated } from 'src/bundles/UIAppBundle/events';
import { ActivityLogsGetOne } from 'src/bundles/UIAppBundle/queries';
import { ActivityLogDetailsCreateModal, ActivityNotesEditModal, DataGridContainer } from '../..';


const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',

    width: 300,
  },

  {
    field: 'note',
    headerName: 'Note',

    // TODO: obviously, remove this from here.
    renderCell: (props) => {
      const activityNote = props.value as ActivityNote;

      const activityLogDetailsId = props.id.toString()

      const [open, setOpen] = useState(false)

      return (
        <div>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <ActivityNotesEditModal {...{ open, onClose: () => setOpen(false), activityNote, activityLogDetailsId }} />
        </div>
      )
    },

    width: 1200,
  },

  {
    field: 'timing',
    headerName: 'Timing',

    valueFormatter: (props) => {
      const activityTiming = props.value as ActivityTiming;

      return `${new Date(activityTiming.startedAt).toLocaleTimeString()} -- ${new Date(
        activityTiming.finishedAt
      ).toLocaleTimeString()}`;
    },

    width: 500,
  },

  {
    field: 'createdAt',
    headerName: 'Created At',

    valueFormatter: (props) => new Date(props.value as number).toLocaleDateString(),

    width: 250,
  },
];

export const ActivityLogContainer: React.FC = () => {
  const router = useRouter();

  const [activityLog, setActivityLog] = useActivityLog()

  const [isCreateModalOpened, setIsCreateModalOpened] = useState(false);

  const UIComponents = useUIComponents();

  const activityLogId = router.next.query.id;

  const { loading: activityLogLoading, error: activityLogError } = useQuery<
    { EndUsersActivityLogsGetOne: Query['EndUsersActivityLogsGetOne'] },
    { input: EndUsersActivityLogsGetOneInput }
  >(ActivityLogsGetOne, {
    variables: {
      input: {
        activityLogId,
      },
    },

    onCompleted: (data) => setActivityLog(data.EndUsersActivityLogsGetOne),
  });

  const eventManager = useEventManager();

  useEffect(() => {
    const listener: EventHandlerType<IActivityLogDetailCreated> = (e) => {
      setActivityLog((previousActivityLog) => {
        const activityLog = previousActivityLog as ActivityLog;

        const details = [...(activityLog as ActivityLog).details];

        details.push(e.data.activityLogDetail);

        return {
          ...activityLog,

          details,
        };
      });
    };

    eventManager.addListener(ActivityLogDetailCreatedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogDetailCreatedEvent as any, listener); // TODO: fix in BL
    };
  }, []);

  useEffect(() => {
    const listener: EventHandlerType<IActivityNoteUpdated> = e => {
      setActivityLog(previousActivityLog => {
        const activityLog = previousActivityLog as ActivityLog;

        const details = cloneDeep(activityLog.details)

        const { value, activityLogDetailsId } = e.data.activityNote

        const detail = details.find(detail => detail._id === activityLogDetailsId)

        if (detail) {
          detail.note.value = value;
        }

        return {
          ...activityLog,

          details,
        };
      })
    }

    eventManager.addListener(ActivityNoteUpdatedEvent, listener)

    return () => {
      eventManager.removeListener(ActivityNoteUpdatedEvent as any, listener)
    }
  })

  if (activityLogError) return <UIComponents.Error error={activityLogError} />;

  if (activityLogLoading || activityLog === undefined) return <UIComponents.Loading />;

  const onDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <Box>
      <Typography variant="h6">{activityLog.name}</Typography>

      <ActivityLogDetailsCreateModal
        {...{
          open: isCreateModalOpened,
          onClose: () => setIsCreateModalOpened(false),
          createContainerProps: { activityLog },
        }}
      />

      <DataGridContainer
        {...{
          rows: activityLog.details,

          columns,
          onDelete,
          toolbarProps: {
            onCreatePress: () => setIsCreateModalOpened(true),
          },
        }}
      />
    </Box>
  );
};
