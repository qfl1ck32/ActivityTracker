import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextFieldProps, MenuItem, TextField, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldType, NoteModel } from 'src/api.types';
import { NoteDetailsService } from 'src/bundles/UIAppBundle/services';

export type NoteDetailsCreateFormProps = {
  onSubmit: (data: Object) => Promise<void>;

  isSubmitting: boolean;

  noteModel: NoteModel;

  defaultValues?: any;
};

export const NoteDetailsCreateForm: React.FC<NoteDetailsCreateFormProps> = ({
  onSubmit,
  noteModel,
  isSubmitting,
  defaultValues,
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
            props['defaultValue'] = 'none';
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
          return <FormControlLabel label={field.name} control={<Checkbox {...register(field.id)} />} />;
        }

        const Field: React.FC = ({ children }) => (
          <TextField
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
            <Field>
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
          return <Field />;
        }
      })}

      <LoadingButton loading={isSubmitting} type="submit">
        Create
      </LoadingButton>
    </form>
  );
};
