import { Service } from '@bluelibs/core';
import { FormFieldType } from './types';

import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
import { HTMLInputTypeAttribute } from 'react';

@Service()
export class FormService {
  public buildSchema(fields: FormFieldType[]) {
    const spec = {} as ObjectShape;

    for (const field of fields) {
      spec[field.name] = field.nest?.length ? this.buildSchema(field.nest) : this.getFieldYupSchema(field);
    }

    return yup.object(spec);
  }

  public getFieldYupSchema(field: FormFieldType) {
    const { type, isRequired, enumValues } = field;

    const textTypes = ['text', 'password', 'email'] as HTMLInputTypeAttribute[];

    let schema = null;

    if (textTypes.includes(type)) {
      schema = yup.string();
    } else if (type === 'number') {
      // TODO: maybe add "onlyIntegers?: boolean" to FormFieldType; by default, it allows floats too
      schema = yup
        .number()
        .test({
          name: 'is-int-or-float',

          test: (value) => (value ? new RegExp(/^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/).test(String(value)) : true),
        })
        .transform((v, o) => (o === '' ? null : v));
    } else if (type === 'checkbox') {
      schema = yup.boolean();
    } else {
      schema = yup.string();
    }

    if (enumValues?.length) {
      // FIXME: shame on typescript
      const values = enumValues.map((enumValue) => (typeof enumValue === 'string' ? enumValue : enumValue.value));

      schema = (schema as any).oneOf(isRequired ? values : [''].concat(values));
    }

    if (isRequired) {
      schema = schema.required();
    } else {
      schema = schema.nullable();
    }

    return schema;
  }
}
