import { useMutation, useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { EJSON } from '@bluelibs/ejson';
import { useEventManager, useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { Box, Typography } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { cloneDeep } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import {
  ActivityLog,
  ActivityLogDetail,
  ActivityNote,
  ActivityTiming,
  EndUsersActivityLogsGetOneInput,
  EndUsersActivityNotesUpdateInput,
  FieldType,
  Mutation,
  Query,
} from 'src/api.types';
import { useActivityLog } from 'src/bundles/UIAppBundle/contexts';
import { ActivityLogDetailCreatedEvent, ActivityNoteUpdatedEvent, IActivityLogDetailCreated, IActivityNoteUpdated } from 'src/bundles/UIAppBundle/events';
import { ActivityNotesUpdate } from 'src/bundles/UIAppBundle/mutations';
import { ActivityLogsGetOne } from 'src/bundles/UIAppBundle/queries';
import { ActivityNoteDetailNoteValuesType } from 'src/bundles/UIAppBundle/types';
import { ActivityLogDetailsCreateModal, DataGridContainer, NoteDetailsForm } from '../..';

import { toast } from 'react-toastify'

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

      const [isSubmitting, setIsSubmitting] = useState(false)

      const [activityLog] = useActivityLog()

      const eventManager = useEventManager()

      const UIComponents = useUIComponents()

      const value = EJSON.parse(activityNote.value) as ActivityNoteDetailNoteValuesType;

      const [updateActivityNote] = useMutation<{ EndUsersActivityNotesUpdate: Mutation['EndUsersActivityNotesUpdate'] }, { input: EndUsersActivityNotesUpdateInput }>(ActivityNotesUpdate)

      const onSubmit = async (value: Record<string, any>) => {
        setIsSubmitting(true)

        try {
          const { data } = await updateActivityNote({
            variables: {
              input: {
                activityLogDetailsId,
                value: EJSON.stringify(value)
              }
            }
          })

          await eventManager.emit(new ActivityNoteUpdatedEvent({
            activityNote: data?.EndUsersActivityNotesUpdate as ActivityNote
          }))

          toast.info("You have successfully updated the note!")
        }

        catch (err: any) {
          toast.error(err.toString())
        }

        finally {
          setIsSubmitting(false)
        }
      }

      return isSubmitting ? <UIComponents.Loading /> :

        <NoteDetailsForm
          isSubmitting={isSubmitting}
          type="edit"
          onSubmit={onSubmit}
          noteModel={
            activityLog.noteModel
          }
          defaultValues={value}
        />

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
