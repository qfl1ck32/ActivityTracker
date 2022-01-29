import { field, sharedModel } from "../utils";

export const FieldRules = sharedModel({
  id: "FieldRules",

  fields: [
    field.string("enumValues", {
      isArray: true,
    }),
  ],
});

export const Field = sharedModel({
  id: "Field",

  fields: [
    field.enum("type", {
      enumValues: ["BOOLEAN", "ENUM", "DATE", "STRING"],
    }),

    field.object("rules", {
      model: () => FieldRules,
    }),
  ],
});
