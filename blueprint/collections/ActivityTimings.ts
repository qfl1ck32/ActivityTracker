import { collection, field, relation, shortcuts } from "../utils";

export const ActivityTimings = collection({
  id: "ActivityTimings",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [
    field.date("startedAt"),
    field.date("finishedAt", {
      isRequired: false,
    }),

    field.boolean("isFinished", {
      isReducer: true,

      reducerDependency: {
        finishedAt: 1,
      },
    }),

    ...shortcuts.fields.timestampable(),
    shortcuts.field.softdeletable(),
  ],

  relations: [
    relation({
      id: "endUser",
      to: "EndUsers",
    }),

    relation({
      id: "activityLogDetails",
      to: "ActivityLogDetails",
    }),

    ...shortcuts.relations.blameable(),
  ],
});
