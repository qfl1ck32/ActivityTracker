import { field, sharedModel } from "../utils";

export const FieldEnumValues = sharedModel({
  id: "FieldEnumValues",

  fields: [field.string("id"), field.string("value")],
});

export const FieldRules = sharedModel({
  id: "FieldRules",

  fields: [
    field.object("enumValues", {
      model: () => FieldEnumValues,

      isArray: true,
      defaultValue: [],
    }),
  ],
});

export const Field = sharedModel({
  id: "Field",

  fields: [
    field.string("id"),

    field.string("name"),

    field.boolean("isArray"),

    field.enum("type", {
      enumValues: ["BOOLEAN", "ENUM", "NUMBER", "STRING", "OBJECT"],
    }),

    field.object("model", {
      model: () => Field,

      isRequired: false,
    }),

    ...FieldRules.fields, // nesting level not rendered correctly in BlueLibs Admin UI, leaving like this for the moment
  ],
});
