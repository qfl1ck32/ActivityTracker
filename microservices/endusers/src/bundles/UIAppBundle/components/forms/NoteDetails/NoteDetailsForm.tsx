import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '../../';
import {
  TextFieldProps,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldType, NoteModel } from 'src/api.types';
import { NoteDetailsService } from 'src/bundles/UIAppBundle/services';
import { FormContext } from 'src/bundles/UIAppBundle/types';
import { isEmpty } from 'lodash-es';
import { Form } from '../Form';

export type NoteDetailsFormProps = {
  onSubmit: (data: Object) => Promise<boolean>;

  isSubmitting: boolean;

  noteModel: NoteModel;

  defaultValues?: any;

  context: FormContext;
};

export const NoteDetailsForm: React.FC<NoteDetailsFormProps> = ({
  onSubmit,
  noteModel,
  isSubmitting,

  context,
  defaultValues = {},
}) => {
  const noteDetailsService = use(NoteDetailsService);

  const [fields] = useState(noteDetailsService.buildFormFieldTypesFromNoteModel(noteModel));

  return (
    <Form
      {...{
        onSubmit,
        fields,
        isSubmitting,
        defaultValues,
        submitButtonText: context === 'edit' ? 'Edit' : 'Create',
      }}
    />
  );
};
