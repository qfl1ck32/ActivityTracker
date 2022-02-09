import { useMutation, useQuery } from '@apollo/client';
import { EventHandlerType } from '@bluelibs/core';
import { useEventManager, useRouter } from '@bluelibs/x-ui-next';
import { useUIComponents } from '@bluelibs/x-ui-react-bundle';
import { LoadingButton } from '../../';
import { Box, Button, Container, Typography } from '@mui/material';
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
  EndUsersActivityLogDetailsDeleteInput,
  EndUsersActivityLogDetailsFinishInput,
  EndUsersActivityLogsGetOneInput,
  Mutation,
  Query,
} from 'src/api.types';
import { useActivityLog } from 'src/bundles/UIAppBundle/contexts';
import {
  ActivityLogDetailCreatedEvent,
  ActivityLogDetailDeletedEvent,
  ActivityLogDetailFinishedEvent,
  ActivityNoteUpdatedEvent,
  IActivityLogDetailCreated,
  IActivityLogDetailDeleted,
  IActivityLogDetailFinished,
  IActivityNoteUpdated,
} from 'src/bundles/UIAppBundle/events';
import {
  ActivityLogDetailsCreate,
  ActivityLogDetailsDelete,
  ActivityLogDetailsFinish,
} from 'src/bundles/UIAppBundle/mutations';
import { ActivityLogsGetOne } from 'src/bundles/UIAppBundle/queries';
import { ActivityNotesEditContainer, DataGridContainer, DialogContainer } from '../..';
import { activityLogDetailsColumns } from './columns';

export const ActivityLogContainer: React.FC = () => {
  const router = useRouter();

  const [activityLog, setActivityLog] = useActivityLog();

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

  const [deleteActivityLogDetails] = useMutation<
    { EndUsersActivityLogDetailsDelete: Mutation['EndUsersActivityLogDetailsDelete'] },
    { input: EndUsersActivityLogDetailsDeleteInput }
  >(ActivityLogDetailsDelete);

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
    }
  };

  // TODO: think a bit - why do we keep on using events? these are in the same component :| smartass
  const onDelete = async (activityLogDetailId: string) => {
    try {
      await deleteActivityLogDetails({
        variables: {
          input: {
            activityLogDetailId,
          },
        },
      });

      eventManager.emit(
        new ActivityLogDetailDeletedEvent({
          activityLogDetailId,
        })
      );

      toast.info('You have successfully deleted the log.');
    } catch (err: any) {
      toast.error(err.toString());
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

        const { value, activityLogDetailId } = e.data.activityNote;

        const detail = details.find((detail) => detail._id === activityLogDetailId);

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

    eventManager.addListener(ActivityLogDetailFinishedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogDetailFinishedEvent as any, listener);
    };
  });

  useEffect(() => {
    const listener: EventHandlerType<IActivityLogDetailDeleted> = (e) => {
      setActivityLog((previousActivityLog) => {
        const activityLog = previousActivityLog as ActivityLog;

        const details = cloneDeep(activityLog.details);

        const { activityLogDetailId } = e.data;

        const detailIndex = details.findIndex((detail) => detail._id === activityLogDetailId);

        details.splice(detailIndex, 1);

        return {
          ...activityLog,

          details,
        };
      });
    };

    eventManager.addListener(ActivityLogDetailDeletedEvent, listener);

    return () => {
      eventManager.removeListener(ActivityLogDetailDeletedEvent as any, listener);
    };
  });

  if (activityLogError) return <UIComponents.Error error={activityLogError} />;

  return (
    <UIComponents.Layout title={`Activity log - ${activityLog ? activityLog.activity.name : ' ... '}`}>
      <Container>
        {activityLogLoading || activityLog === undefined ? (
          <UIComponents.Loader horizontalCenter verticalCenter />
        ) : (
          <DataGridContainer
            {...{
              rows: activityLog.details,

              columns: activityLogDetailsColumns,

              dataGridRowActionsProps: {
                onDelete,

                deleteModalMessage: `Are you sure you want to delete the log?`,
              },

              toolbarProps: {
                onCreatePress: onCreateActivityLogDetails,
              },
            }}
          />
        )}
      </Container>
    </UIComponents.Layout>
  );
};
