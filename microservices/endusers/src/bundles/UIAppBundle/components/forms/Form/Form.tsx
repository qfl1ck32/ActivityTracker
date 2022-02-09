import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@mui/material';
import { get, isEmpty } from 'lodash-es';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormService } from 'src/bundles/UIAppBundle/services';
import { FormFieldType } from 'src/bundles/UIAppBundle/services/types';
import { LoadingButton } from '../..';

export type FormProps<T> = {
  fields: FormFieldType[];

  isSubmitting: boolean;

  onSubmit: (data: T) => Promise<boolean>;

  defaultValues?: Record<string, any>;

  submitButtonText: string;
};

export function Form<T>(props: FormProps<T>) {
  const formService = use(FormService);

  const { fields, isSubmitting, onSubmit, defaultValues, submitButtonText } = props;

  const [schema] = useState(formService.buildSchema(fields));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues,
  });

  const renderField = (field: FormFieldType) => {
    if (field.nest?.length) {
      const fields = field.nest.map((nestedField) =>
        renderField({
          ...nestedField,
          name: `${field.name}.${nestedField.name}`,
        })
      ) as JSX.Element[];

      return fields;
    }

    return (
      <div key={field.name}>
        <TextField
          label={field.label}
          fullWidth
          margin="normal"
          type={field.type}
          error={Boolean(get(errors, field.name))}
          helperText={get(errors, field.name)?.message}
          {...register(field.name)}
        />
      </div>
    );
  };

  const onFormSubmit = (e: any) => {
    return handleSubmit(async (data: any) => {
      const ok = await onSubmit(data);

      if (ok) {
        reset(data);
      }
    })(e);
  };

  return (
    <form onSubmit={onFormSubmit}>
      {fields.map(renderField)}

      <LoadingButton
        disabled={!isValid || isEmpty(dirtyFields)}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        fullWidth
        type="submit"
        loading={isSubmitting}
      >
        {submitButtonText}
      </LoadingButton>
    </form>
  );
}
