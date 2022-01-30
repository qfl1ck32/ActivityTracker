import { field, sharedModel } from "../utils";

export const FieldRules = sharedModel({
  id: "FieldRules",

  fields: [
    field.string("enumValues", {
      isArray: true,
      isRequired: false,
    }),
  ],
});

export const Field = sharedModel({
  id: "Field",

  fields: [
    field.string("name"),

    field.enum("type", {
      enumValues: ["BOOLEAN", "ENUM", "INTEGER", "FLOAT", "STRING"],
    }),

    ...FieldRules.fields, // nesting level not rendered correctly in BlueLibs Admin UI, leaving like this for the moment
  ],
});
