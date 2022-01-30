import { collection, field, relation, shortcuts } from "../utils";

export const ActivityNotes = collection({
  id: "ActivityNotes",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "value",

  fields: [
    field.string("value", {
      defaultValue: "{}",
      description:
        "We are representing the value as an object, because we don't have an exact representation of how the note will look like.",
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
