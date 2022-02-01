import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { TextFieldProps, MenuItem, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FieldType, NoteModel } from 'src/api.types';
import { NoteDetailsService } from 'src/bundles/UIAppBundle/services';

export type NoteDetailsCreateFormProps = {
  onSubmit: (data: any) => Promise<void>;

  isSubmitting: boolean;

  noteModel: NoteModel;
};

export const NoteDetailsCreateForm: React.FC<NoteDetailsCreateFormProps> = ({ onSubmit, noteModel, isSubmitting }) => {
  const noteDetailsService = use(NoteDetailsService);

  const [schema] = useState(noteDetailsService.createYupSchema(noteModel));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit as any)}>
      {noteModel.fields.map((field) => {
        let props: TextFieldProps = {};

        switch (field.type) {
          case FieldType.BOOLEAN: {
            props['type'] = 'text';
          }

          case FieldType.ENUM: {
            props['select'] = true;
            props['defaultValue'] = 'none';
          }

          case FieldType.NUMBER: {
            props['type'] = 'number';
          }

          case FieldType.STRING: {
            props['type'] = 'text';
          }
        }

        const Field: React.FC = ({ children }) => (
          <TextField
            {...props}
            label={field.name}
            {...register(field.name)}
            error={Boolean(errors[field.name])}
            helperText={errors[field.name]?.message}
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

              {field.enumValues?.map((enumValue) => (
                <MenuItem key={enumValue} value={enumValue}>
                  {enumValue}
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
