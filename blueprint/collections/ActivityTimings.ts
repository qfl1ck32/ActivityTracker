import { collection, field, relation, shortcuts } from "../utils";

export const ActivityTimings = collection({
  id: "ActivityTimings",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "startedAt",

  fields: [
    field.date("startedAt"),
    field.date("finishedAt", {
      isRequired: false,
    }),

    ...shortcuts.fields.timestampable(),
  ],

  relations: [
    relation({
      id: "endUser",
      to: "EndUsers",
    }),

    relation({
      id: "activityLog",
      to: "ActivityLogs",
    }),

    ...shortcuts.relations.blameable(),
  ],
});
