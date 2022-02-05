import { useMutation, useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useRouter, useUIComponents } from '@bluelibs/x-ui-next';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { GridColumns } from '@mui/x-data-grid';
import { cloneDeep } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  ActivityLog,
  ActivityLogDetail,
  ActivityNote,
  ActivityTiming,
  EndUsersActivityLogDetailsCreateInput,
  EndUsersActivityLogDetailsFinishInput,
  EndUsersActivityLogsGetOneInput,
  Mutation,
  Query,
} from 'src/api.types';
import { useActivityLog } from 'src/bundles/UIAppBundle/contexts';
import {
  ActivityLogDetailCreatedEvent,
  ActivityLogDetailFinishedvent,
  ActivityNoteUpdatedEvent,
  IActivityLogDetailCreated,
  IActivityLogDetailFinished,
  IActivityNoteUpdated,
} from 'src/bundles/UIAppBundle/events';
import { ActivityLogDetailsCreate, ActivityLogDetailsFinish } from 'src/bundles/UIAppBundle/mutations';
import { ActivityLogsGetOne } from 'src/bundles/UIAppBundle/queries';
import { ActivityNotesEditDialog, DataGridContainer } from '../..';
import { ActivityLogDetailsCreateDialog } from '../../dialogs/ActivityLogDetails/ActivityLogDetailsCreateDialog';

const columns: GridColumns = [
  {
    field: 'id',
    headerName: 'ID',

    width: 300,
  },

  {
    field: 'note',
    headerName: 'Note',

    renderCell: (props) => {
      const activityNote = props.value as ActivityNote;

      const activityLogDetailsId = props.id.toString();

      const [open, setOpen] = useState(false);

      return (
        <div>
          <Button onClick={() => setOpen(true)}>Open</Button>
          <ActivityNotesEditDialog {...{ open, onClose: () => setOpen(false), activityNote, activityLogDetailsId }} />
        </div>
      );
    },

    width: 200,
  },

  {
    field: 'finish',
    headerName: 'Finish',

    // TODO: handle better...
    // idea: useSomething() that receives an id / object and has all logic inside it, and you can just use it?
    renderCell: (params) => {
      const [isSubmitting, setIsSubmitting] = useState(false);

      const activityLogDetail = params.row;

      const [finishActivityLogDetails] = useMutation<
        { EndUsersActivityLogDetailsFinish: Mutation['EndUsersActivityLogDetailsFinish'] },
        { input: EndUsersActivityLogDetailsFinishInput }
      >(ActivityLogDetailsFinish);

      const eventManager = useEventManager();

      const onClick = async () => {
        setIsSubmitting(true);

        try {
          const { data } = await finishActivityLogDetails({
            variables: {
              input: {
                activityLogDetailsId: activityLogDetail.id,
              },
            },
          });

          eventManager.emit(
            new ActivityLogDetailFinishedvent({
              activityLogDetail: data?.EndUsersActivityLogDetailsFinish as ActivityLogDetail,
            })
          );

          toast.info('You have successfully finished the activity.');
        } catch (err: any) {
          toast.error(err.toString());
        } finally {
          setIsSubmitting(false);
        }
      };

      return (
        <LoadingButton disabled={activityLogDetail.timing.isFinished} loading={isSubmitting} onClick={onClick}>
          Finish
        </LoadingButton>
      );
    },
  },

  {
    field: 'timing',
    headerName: 'Timing',

    valueFormatter: (props) => {
      const activityTiming = props.value as ActivityTiming;

      return `${new Date(activityTiming.startedAt).toLocaleTimeString()} -- ${
        activityTiming.isFinished ? new Date(activityTiming.finishedAt).toLocaleTimeString() : 'Ongoing'
      }`;
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

  const [activityLog, setActivityLog] = useActivityLog();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const UIComponents = useUIComponents();

  const eventManager = useEventManager();

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

  const [createActivityLogDetails] = useMutation<
    { EndUsersActivityLogDetailsCreate: Mutation['EndUsersActivityLogDetailsCreate'] },
    { input: EndUsersActivityLogDetailsCreateInput }
  >(ActivityLogDetailsCreate);

  const onCreateActivityLogDetails = async () => {
    try {
      const { data } = await createActivityLogDetails({
        variables: {
          input: {
            activityLogId: activityLog._id,
          },
        },
      });

      await eventManager.emit(
        new ActivityLogDetailCreatedEvent({
          activityLogDetail: data?.EndUsersActivityLogDetailsCreate as ActivityLogDetail,
        })
      );

      toast.info('You have successfully created the activity log details');
    } catch (err: any) {
      toast.error(err.toString());
    } finally {
      setIsSubmitting(false);
    }
  };

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
    const listener: EventHandlerType<IActivityNoteUpdated> = (e) => {
      setActivityLog((previousActivityLog) => {
        const activityLog = previousActivityLog as ActivityLog;

        const details = cloneDeep(activityLog.details);

        const { value, activityLogDetailsId } = e.data.activityNote;

        const detail = details.find((detail) => detail._id === activityLogDetailsId);

        if (detail) {
          detail.note.value = value;
        }

        return {
          ...activityLog,

          details,
        };
      });
    };

    eventManager.addListener(ActivityNoteUpdatedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityNoteUpdatedEvent as any, listener);
    };
  });

  useEffect(() => {
    const listener: EventHandlerType<IActivityLogDetailFinished> = (e) => {
      setActivityLog((previousActivityLog) => {
        const activityLog = previousActivityLog as ActivityLog;

        const details = cloneDeep(activityLog.details);

        const { activityLogDetail } = e.data;

        const detailIndex = details.findIndex((detail) => detail._id === activityLogDetail._id);

        details.splice(detailIndex, 1, activityLogDetail);

        return {
          ...activityLog,

          details,
        };
      });
    };

    eventManager.addListener(ActivityLogDetailFinishedvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogDetailFinishedvent as any, listener);
    };
  });

  if (activityLogError) return <UIComponents.Error error={activityLogError} />;

  if (activityLogLoading || activityLog === undefined) return <UIComponents.Loading />;

  const onDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <Box>
      <Typography variant="h6">{activityLog.name}</Typography>

      <DataGridContainer
        {...{
          rows: activityLog.details,

          columns,
          onDelete,
          toolbarProps: {
            onCreatePress: onCreateActivityLogDetails,
          },
        }}
      />
    </Box>
  );
};
