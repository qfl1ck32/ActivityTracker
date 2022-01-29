import { collection, field, relation, shortcuts } from "../utils";

export const ActivityNotes = collection({
  id: "ActivityNotes",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [field.string("description"), ...shortcuts.fields.timestampable()],

  relations: [
    relation({
      id: "activityLog",
      to: "ActivityLogs",
    }),
    ...shortcuts.relations.blameable(),
  ],
});
