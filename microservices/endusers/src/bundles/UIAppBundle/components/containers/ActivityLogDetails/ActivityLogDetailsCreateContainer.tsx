import 'regenerator-runtime';

import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import env from 'src/env';
import { ActivityLogDetailsComponent } from '../..';

import { ActivityLog } from 'src/api.types';

export type ActivityLogDetailsCreateContainerProps = {
  activityLog: ActivityLog;
};

export const ActivityLogDetailsCreateContainer: React.FC<ActivityLogDetailsCreateContainerProps> = ({
  activityLog,
}) => {
  const [startAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/start.mp3`));
  const [stopAudio] = useState(new Audio(`${env.APP_URL}/assets/audio/stop.mp3`));

  const { transcript, resetTranscript } = useSpeechRecognition();

  const [showingActivityLogDetailsComponent, setShowingActivityLogDetailsComponent] = useState(false);

  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const [startTime, setStartTime] = useState<Date>(new Date());
  const [finishTime, setFinishTime] = useState<Date>(new Date());

  const [startCountdown, setStartCountdown] = useState(0);

  const start = () => {
    setTimeout(() => {
      setHasStarted(true);
      setHasFinished(false);

      setStartTime(new Date());

      setShowingActivityLogDetailsComponent(false);

      //   startAudio.play();
    }, startCountdown * 1000);
  };

  const stop = () => {
    setHasFinished(true);
    setHasStarted(false);

    setFinishTime(new Date());

    setShowingActivityLogDetailsComponent(true);

    // stopAudio.play();
  };

  return (
    <Box>
      <Button disabled={hasStarted} onClick={start}>
        Start
      </Button>

      <Button disabled={hasFinished} onClick={stop}>
        Stop
      </Button>

      {showingActivityLogDetailsComponent && (
        <ActivityLogDetailsComponent {...{ activityLog, startTime, finishTime }} />
      )}

      <h5>{transcript}</h5>
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
