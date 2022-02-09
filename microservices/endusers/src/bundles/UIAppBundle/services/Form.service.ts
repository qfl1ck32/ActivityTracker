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
      schema = yup.number();
    } else {
      schema = yup.string();
    }

    // TODO: wut
    if (field.enumValues) {
      schema = (schema as any).oneOf(enumValues);
    }

    if (isRequired) {
      schema = schema.required();
    }

    return schema;
  }
}
