import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldType, NoteModel } from 'src/api.types';
import { NoteDetailsService } from 'src/bundles/UIAppBundle/services';
import { FormContext } from 'src/bundles/UIAppBundle/types';

export type NoteDetailsFormProps = {
  onSubmit: (data: Object) => Promise<void>;

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

  const [schema] = useState(noteDetailsService.createYupSchema(noteModel));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues,
  });

  // TODO: maybe we should handle this via transforming, or, something. this happens only for enumValues.
  const submit = (e: any) => {
    handleSubmit((data) => {
      const filteredData = data;

      for (const key in data) {
        if (!filteredData[key]) {
          delete filteredData[key];
        }
      }

      onSubmit(filteredData);
    })(e);
  };

  return (
    <form onSubmit={submit}>
      {noteModel.fields.map((field) => {
        if (field.type === FieldType.ENUM) {
          return (
            <div key={field.id}>
              <FormHelperText>{field.name}</FormHelperText>

              <Select
                fullWidth
                {...register(field.id)}
                defaultValue={defaultValues[field.id] || ''}
                displayEmpty
                inputProps={{ 'aria-label': field.name }}
                error={Boolean(errors[field.id])}
              >
                <MenuItem disabled value="">
                  Select a value
                </MenuItem>
                {field.enumValues.map((enumValue) => (
                  <MenuItem key={enumValue.id} value={enumValue.id}>
                    {enumValue.value}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>{errors[field.id]?.message}</FormHelperText>
            </div>
          );
        }

        if (field.type === FieldType.BOOLEAN) {
          return (
            <div key={field.id}>
              <FormControlLabel
                label={field.name}
                control={<Checkbox {...register(field.id)} defaultChecked={defaultValues[field.id]} />}
              />
            </div>
          );
        }

        let props: TextFieldProps = {};

        switch (field.type) {
          case FieldType.NUMBER: {
            props['type'] = 'number';
            break;
          }

          case FieldType.STRING: {
            props['type'] = 'text';
            break;
          }
        }

        const Field: React.FC = ({ children }) => (
          <TextField
            margin="normal"
            fullWidth
            {...props}
            label={field.name}
            {...register(field.id)}
            error={Boolean(errors[field.id])}
            helperText={errors[field.id]?.message}
          >
            {children}
          </TextField>
        );

        return (
          <div key={field.id}>
            <Field />
          </div>
        );
      })}

      <Box style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadingButton variant="contained" loading={isSubmitting} type="submit">
          {context === 'create' ? 'Create' : 'Edit'}
        </LoadingButton>
      </Box>
    </form>
  );
};
