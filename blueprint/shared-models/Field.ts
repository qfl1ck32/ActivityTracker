import { field, sharedModel } from "../utils";

export const Field = sharedModel({
  id: "Field",

  fields: [
    field.enum("type", {
      enumValues: ["BOOLEAN", "ENUM", "DATE", "STRING"],
    }),

    field.object("rules", {
      subfields: [
        field.string("enumValues", {
          isArray: true,
        }),
      ],
    }),
  ],
});
