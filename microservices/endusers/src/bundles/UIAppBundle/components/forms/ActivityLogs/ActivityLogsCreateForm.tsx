import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import { Box, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Activity, EndUsersActivityLogsCreateInput, NoteModel } from 'src/api.types';
import { schema } from './schema';
import { Form } from '../Form';
import { FormFieldType } from 'src/bundles/UIAppBundle/services/types';
import { useState } from 'react';

export type ActivityLogsCreateFormProps = {
  onSubmit: (data: EndUsersActivityLogsCreateInput) => Promise<void>;

  isSubmitting: boolean;

  activities: Activity[];
  noteModels: NoteModel[];
};

export const ActivityLogsCreateForm: React.FC<ActivityLogsCreateFormProps> = ({
  onSubmit,
  isSubmitting,
  activities,
  noteModels,
}) => {
  const [fields] = useState<FormFieldType[]>([
    {
      name: 'activityId',
      label: 'Activity',

      enumValues: activities.map((activity) => ({
        name: activity.name,
        value: activity._id,
      })),

      isRequired: true,

      enumValuePlaceholder: 'Select an activity',
    },
    {
      name: 'noteModelId',
      label: 'Note model',

      enumValues: noteModels.map((noteModel) => ({
        name: noteModel.name,
        value: noteModel._id,
      })),

      isRequired: true,

      enumValuePlaceholder: 'Select a model',
    },
  ]);

  return (
    <Form
      {...{
        fields,
        onSubmit,
        isSubmitting,
        submitButtonText: 'Create',

        submitButtonFullWidth: false,
      }}
    />
  );
};
