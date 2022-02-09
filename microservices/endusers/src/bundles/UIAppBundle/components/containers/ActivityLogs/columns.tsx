import { useMutation } from '@apollo/client';
import { useEventManager } from '@bluelibs/x-ui-next';
import { LoadingButton } from '../../LoadingButton';
import { GridColumns } from '@mui/x-data-grid';
import { Button } from 'antd';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  ActivityNote,
  ActivityLogDetail,
  Mutation,
  EndUsersActivityLogDetailsFinishInput,
  ActivityTiming,
} from 'src/api.types';
import { ActivityLogDetailFinishedEvent } from 'src/bundles/UIAppBundle/events';
import { ActivityLogDetailsFinish } from 'src/bundles/UIAppBundle/mutations';
import { ActivityNotesEditContainer, DialogContainer } from '..';

export const activityLogDetailsColumns: GridColumns = [
  {
    field: 'note',
    headerName: 'Note',

    renderCell: (props) => {
      const activityNote = props.value as ActivityNote;

      const activityLogDetail = props.row as ActivityLogDetail;

      const activityLogDetailId = props.id.toString();

      const [open, setOpen] = useState(false);

      return (
        <div>
          <Button onClick={() => setOpen(true)}>Open</Button>

          <DialogContainer
            {...{
              open,
              onClose: () => setOpen(false),

              // TODO: use a service...
              title: `Edit log (${new Date(activityLogDetail.timing.startedAt).toLocaleTimeString()} - ${
                activityLogDetail.timing.finishedAt
                  ? new Date(activityLogDetail.timing.finishedAt).toLocaleTimeString()
                  : 'ongoing'
              })`,
            }}
          >
            <ActivityNotesEditContainer {...{ activityLogDetailId, activityNote }} />
          </DialogContainer>
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
    // TODO: MAKE IT A COMPONENT
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
                activityLogDetailId: activityLogDetail.id,
              },
            },
          });

          eventManager.emit(
            new ActivityLogDetailFinishedEvent({
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
        <LoadingButton
          variant="contained"
          disabled={activityLogDetail.timing.isFinished}
          loading={isSubmitting}
          onClick={onClick}
        >
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

      return `${new Date(activityTiming.startedAt).toLocaleTimeString()} - ${
        activityTiming.isFinished ? new Date(activityTiming.finishedAt).toLocaleTimeString() : 'Ongoing'
      }`;
    },

    width: 200,
  },
];
