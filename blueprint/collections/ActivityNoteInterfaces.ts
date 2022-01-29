import { Field } from "../shared-models/Field";
import { collection, field, shortcuts } from "../utils";

export const ActivityNoteInterfaces = collection({
  id: "ActivityNoteInterfaces",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [
    field.object("fields", {
      model: () => Field,

      isArray: true,
    }),

    ...shortcuts.fields.timestampable(),
  ],
});
