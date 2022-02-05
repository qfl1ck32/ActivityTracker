import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextFieldProps, MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldType, NoteModel } from 'src/api.types';
import { NoteDetailsService } from 'src/bundles/UIAppBundle/services';

export type NoteDetailsFormProps = {
  onSubmit: (data: Object) => Promise<void>;

  isSubmitting: boolean;

  noteModel: NoteModel;

  defaultValues?: any;

  type: 'edit' | 'create';
};

export const NoteDetailsForm: React.FC<NoteDetailsFormProps> = ({
  onSubmit,
  noteModel,
  isSubmitting,

  type,
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

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      {noteModel.fields.map((field) => {
        let props: TextFieldProps = {};

        switch (field.type) {
          case FieldType.BOOLEAN: {
            props['type'] = 'checkbox';
            break;
          }

          case FieldType.ENUM: {
            props['select'] = true;
            props['defaultValue'] = defaultValues[field.id] ?? 'none';
            break;
          }

          case FieldType.NUMBER: {
            props['type'] = 'number';
            break;
          }

          case FieldType.STRING: {
            props['type'] = 'text';
            break;
          }
        }

        if (field.type === FieldType.BOOLEAN) {
          return (
            <FormControlLabel
              key={field.id}
              label={field.name}
              control={<Checkbox {...register(field.id)} defaultChecked={defaultValues[field.id]} />}
            />
          );
        }

        const Field: React.FC = ({ children }) => (
          <TextField
            key={field.id}
            {...props}
            label={field.name}
            {...register(field.id)}
            error={Boolean(errors[field.id])}
            helperText={errors[field.id]?.message}
          >
            {children}
          </TextField>
        );

        if (field.type === FieldType.ENUM) {
          return (
            <Field key={field.id}>
              <MenuItem disabled value="none">
                Select a value
              </MenuItem>

              {field.enumValues.map((enumValue) => (
                <MenuItem key={enumValue.id} value={enumValue.id}>
                  {enumValue.value}
                </MenuItem>
              ))}
            </Field>
          );
        } else {
          return <Field key={field.id} />;
        }
      })}

      <LoadingButton loading={isSubmitting} type="submit">
        {type === 'create' ? 'Create' : 'Edit'}
      </LoadingButton>
    </form>
  );
};
