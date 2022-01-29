import { collection, field, shortcuts } from "../utils";

export const Activities = collection({
  id: "Activities",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "name",

  fields: [field.string("name"), ...shortcuts.fields.timestampable()],

  relations: [...shortcuts.relations.blameable()],
});
