import { collection, field, relation, shortcuts } from "../utils";

export const ActivityTimings = collection({
  id: "ActivityTimings",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "name",

  fields: [
    field.string("name"),

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
