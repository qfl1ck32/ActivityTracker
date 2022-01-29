import { collection, field, relation, shortcuts } from "../utils";

export const ActivityLogs = collection({
  id: "ActivityLogs",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "name",

  fields: [field.string("name"), ...shortcuts.fields.timestampable()],

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

      isRequired: false, // TODO: just for admin frontend testing

      isMany: true,
    }),

    relation({
      id: "endUser",
      to: "EndUsers",

      unique: true,
    }),

    ...shortcuts.relations.blameable(),
  ],
});
