import { collection, field, relation, shortcuts } from "../utils";

export const ActivityLogDetails = collection({
  id: "ActivityLogDetails",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [
    ...shortcuts.fields.timestampable(),
    shortcuts.field.softdeletable(),
  ],

  relations: [
    ...shortcuts.relations.blameable(),

    relation({
      id: "timing",
      to: "ActivityTimings",
    }),

    relation({
      id: "note",
      to: "ActivityNotes",
    }),

    relation({
      id: "activityLog",
      to: "ActivityLogs",
    }),

    relation({
      id: "endUser",
      to: "EndUsers",
    }),
  ],
});
