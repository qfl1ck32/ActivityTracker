import { Service } from '@bluelibs/core';
import { FieldType, NoteModel } from 'src/api.types';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

@Service()
export class NoteDetailsService {
  public createYupSchema(noteModel: NoteModel) {
    const spec = {} as ObjectShape;

    for (const field of noteModel.fields) {
      switch (field.type) {
        case FieldType.BOOLEAN:
          spec[field.id] = yup.boolean().required();
          break;

        case FieldType.ENUM:
          spec[field.id] = yup
            .string()
            .oneOf(field.enumValues.map((enumValue) => enumValue.id))
            .notOneOf(['none'])
            .required();
          break;

        case FieldType.NUMBER:
          spec[field.id] = yup.number().required();
          break;

        case FieldType.STRING:
          spec[field.id] = yup.string().required();
          break;
      }
    }

    return yup.object(spec).required();
  }
}
