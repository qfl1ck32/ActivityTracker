import { collection, field, shortcuts } from "../utils";

export const DataInterfaces = collection({
  id: "DataInterfaces",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [
    field.object("fields", {
      subfields: [
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

      isArray: true,
    }),

    ...shortcuts.fields.timestampable(),
  ],
});
