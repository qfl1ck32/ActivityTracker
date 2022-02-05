import { collection, field, shortcuts } from "../utils";

export const Activities = collection({
  id: "Activities",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "name",

  fields: [
    field.string("name"),
    ...shortcuts.fields.timestampable(),
    shortcuts.field.softdeletable(),
  ],

  relations: [...shortcuts.relations.blameable()],
});
