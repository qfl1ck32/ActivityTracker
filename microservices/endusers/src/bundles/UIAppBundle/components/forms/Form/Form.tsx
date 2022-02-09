import { use } from '@bluelibs/x-ui-next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, FormControlLabel, FormHelperText, MenuItem, Select, TextField } from '@mui/material';
import { get, isEmpty } from 'lodash-es';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormService } from 'src/bundles/UIAppBundle/services';
import { FormFieldType } from 'src/bundles/UIAppBundle/services/types';
import { LoadingButton } from '../..';

export type FormProps<T> = {
  fields: FormFieldType[];

  isSubmitting: boolean;

  onSubmit: (data: T) => Promise<boolean | void>;

  defaultValues?: Record<string, any>;

  submitButtonText?: string;
  submitButtonFullWidth?: boolean;
};

export function Form<T>(props: FormProps<T>) {
  const formService = use(FormService);

  const { fields, isSubmitting, onSubmit, defaultValues, submitButtonText, submitButtonFullWidth = true } = props;

  const [schema] = useState(formService.buildSchema(fields));

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, dirtyFields },
    reset,
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues,

    mode: 'onChange',
  });

  // TODO: move out?
  const renderField = (field: FormFieldType) => {
    if (field.withLabel === undefined) {
      field.withLabel = true;
    }

    if (field.nest?.length) {
      const fields = field.nest.map((nestedField) =>
        renderField({
          ...nestedField,
          name: `${field.name}.${nestedField.name}`,
        })
      ) as JSX.Element[];

      return fields;
    }

    if (field.type === 'checkbox') {
      return (
        <Fragment key={field.name}>
          {field.withLabel && <FormHelperText>{field.label}</FormHelperText>}

          <FormControlLabel
            label={field.label}
            control={<Checkbox {...register(field.name)} defaultChecked={get(defaultValues, field.name)} />}
          />
        </Fragment>
      );
    }

    if (field.enumValues?.length) {
      return (
        <Fragment key={field.name}>
          {field.withLabel && <FormHelperText>{field.label}</FormHelperText>}

          <Select
            fullWidth
            {...register(field.name)}
            defaultValue={get(defaultValues, field.name) || ''}
            displayEmpty
            inputProps={{ 'aria-label': field.name }}
            error={Boolean(get(errors, field.name))}
          >
            <MenuItem disabled value="">
              {field.enumValuePlaceholder ?? 'Select a value'}
            </MenuItem>
            {field.enumValues.map((enumValue) => {
              let name = '';
              let value = '';

              if (typeof enumValue === 'string') {
                name = value = enumValue;
              } else {
                name = enumValue.name;
                value = enumValue.value;
              }

              return (
                <MenuItem key={name} value={value}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
          <FormHelperText error>{get(errors, field.name)?.message}</FormHelperText>
        </Fragment>
      );
    }

    return (
      <Fragment key={field.name}>
        {field.withLabel && <FormHelperText>{field.label}</FormHelperText>}

        <TextField
          label={field.label}
          fullWidth
          margin="normal"
          // TODO: :(?
          type={field.type === 'number' ? undefined : field.type}
          multiline={field.multiline}
          error={Boolean(get(errors, field.name))}
          helperText={get(errors, field.name)?.message}
          {...register(field.name)}
        />
      </Fragment>
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
        fullWidth={submitButtonFullWidth}
        type="submit"
        loading={isSubmitting}
      >
        {submitButtonText ?? 'Submit'}
      </LoadingButton>
    </form>
  );
}
