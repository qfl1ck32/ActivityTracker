import { collection, relation, shortcuts } from "../utils";

export const ActivityLogs = collection({
  id: "ActivityLogs",

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
    relation({
      id: "activity",
      to: "Activities",
    }),

    relation({
      id: "noteModel",
      to: "NoteModels",
    }),

    relation({
      id: "details",
      to: "ActivityLogDetails",

      inversedBy: "activityLog",
    }),

    relation({
      id: "endUser",
      to: "EndUsers",
    }),

    ...shortcuts.relations.blameable(),
  ],
});
