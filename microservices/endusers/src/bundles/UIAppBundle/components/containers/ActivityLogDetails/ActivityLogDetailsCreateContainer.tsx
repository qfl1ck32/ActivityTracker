import 'regenerator-runtime';

import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import env from 'src/env';
import { ActivityLogDetailsComponent } from '../..';

import { ActivityLog, ActivityLogDetail, EndUsersActivityLogDetailsCreateInput, Mutation } from 'src/api.types';
import { useMutation } from '@apollo/client';
import { ActivityLogDetailsCreate } from 'src/bundles/UIAppBundle/mutations';
import { useEventManager } from '@bluelibs/x-ui-next';
import { ActivityLogDetailCreatedEvent } from 'src/bundles/UIAppBundle/events';

import { toast } from 'react-toastify';

export type ActivityLogDetailsCreateContainerProps = {
  activityLog: ActivityLog;
};

/**
 * @deprecated
 * @param param0
 * @returns
 */
export const ActivityLogDetailsCreateContainer: React.FC<ActivityLogDetailsCreateContainerProps> = ({
  activityLog,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventManager = useEventManager();

  const [startAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/start.mp3`));
  const [stopAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/stop.mp3`));

  const { transcript, resetTranscript } = useSpeechRecognition();

  const [showingActivityLogDetailsComponent, setShowingActivityLogDetailsComponent] = useState(false);

  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const [startedAt, setStartedAt] = useState<Date>(new Date());
  const [finishedAt, setFinishedAt] = useState<Date>(new Date());

  const [startCountdown, setStartCountdown] = useState(0);

  const [createActivityLogDetails] = useMutation<
    { EndUsersActivityLogDetailsCreate: Mutation['EndUsersActivityLogDetailsCreate'] },
    { input: EndUsersActivityLogDetailsCreateInput }
  >(ActivityLogDetailsCreate);

  const onSubmit = async (noteDetailsValue: Object) => {
    setIsSubmitting(true);

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

  // const start = () => {
  //   setTimeout(() => {
  //     setHasStarted(true);
  //     setHasFinished(false);

  //     setStartedAt(new Date());

  //     setShowingActivityLogDetailsComponent(false);

  //     //   startAudio.play();
  //   }, startCountdown * 1000);
  // };

  // const stop = () => {
  //   setHasFinished(true);
  //   setHasStarted(false);

  //   setFinishedAt(new Date());

  //   setShowingActivityLogDetailsComponent(true);

  //   // stopAudio.play();
  // };

  return (
    <Box>
      {/* <Button disabled={hasStarted} onClick={start}>
        Start
      </Button>

      <Button disabled={hasFinished} onClick={stop}>
        Stop
      </Button>

      {showingActivityLogDetailsComponent && (
        <ActivityLogDetailsComponent {...{ activityLog, startedAt, finishedAt, onSubmit, isSubmitting }} />
      )}

      <h5>{transcript}</h5> */}
    </Box>
  );
};

/*
    VERSION WITH BUTTONS

    const [startAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/start.mp3`));
  const [stopAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/stop.mp3`));

  const [hasStarted, setHasStarted] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);

  const [startTime, setStartTime] = useState<Date>();
  const [stopTime, setStopTime] = useState<Date>();

  const [startCountdown, setStartCountdown] = useState(0);

  const start = () => {
    setTimeout(() => {
      setHasStarted(true);
      setHasStopped(false);

      setStartTime(new Date());

      startAudio.play();
    }, startCountdown * 1000);
  };

  const stop = () => {
    setHasStopped(true);
    setHasStarted(false);

    setStopTime(new Date());

    stopAudio.play();
  };

  const onStartCountdownChange = (e: any) => {
    console.log(e);
  };

  return (
    <Box>
      <TextField value={startCountdown} onChange={onStartCountdownChange} type="number" />
      <Button disabled={hasStarted} onClick={start}>
        Start
      </Button>

      <Button disabled={hasStopped} onClick={stop}>
        Stop
      </Button>

      {hasStopped && (
        <Box>
          <Typography variant="h6">Start time: {(startTime as Date).toLocaleTimeString()}</Typography>
          <Typography variant="h6">Stop time: {(stopTime as Date).toLocaleTimeString()}</Typography>
        </Box>
      )}
    </Box>
  );
*/

/*

VERSION WITH SPEECH

 const [startAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/start.mp3`));
  const [stopAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/stop.mp3`));

  const { transcript, resetTranscript } = useSpeechRecognition();

  const [hasStarted, setHasStarted] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);

  const [startTime, setStartTime] = useState<Date>();
  const [stopTime, setStopTime] = useState<Date>();

  useEffect(() => {
    if (hasStopped) return;

    if (!hasStarted && transcript.includes('start')) {
      setStartTime(new Date());

      startAudio.play();

      setHasStarted(true);
      setHasStopped(false);
    }

    if (hasStarted && transcript.includes('stop')) {
      setStopTime(new Date());

      stopAudio.play();

      setHasStopped(true);
      setHasStarted(false);

      resetTranscript();

      SpeechRecognition.stopListening();
    }
  }, [transcript]);

  useEffect(() => {
    if (!startTime && !stopTime) return;

    console.log(startTime);
    console.log(stopTime);
  }, [startTime, stopTime]);

  return (
    <Box>
      <Button hidden={hasStarted} onClick={() => SpeechRecognition.startListening({ continuous: true })}>
        Start listening
      </Button>
      <h5>{transcript}</h5>
    </Box>
  );
*/
