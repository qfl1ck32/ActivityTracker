import { Field } from "../shared-models/Field";
import { collection, field, relation, shortcuts } from "../utils";

export const NoteModels = collection({
  id: "NoteModels",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "name",

  fields: [
    field.string("name"),

    field.object("fields", {
      model: () => Field,

      isArray: true,
    }),

    ...shortcuts.fields.timestampable(),
    shortcuts.field.softdeletable(),
  ],

  relations: [
    relation({
      id: "endUser",
      to: "EndUsers",
    }),
  ],
});
