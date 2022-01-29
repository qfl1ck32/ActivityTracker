import { collection, field, relation, shortcuts } from "../utils";

export const ActivityLogDetails = collection({
  id: "ActivityLogDetails",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  representedBy: "name",

  fields: [field.string("name"), ...shortcuts.fields.timestampable()],

  relations: [
    ...shortcuts.relations.blameable(),

    relation({
      id: "noteModel",
      to: "NoteModels",
    }),

    relation({
      id: "timing",
      to: "ActivityTimings",
    }),

    relation({
      id: "notes",
      to: "ActivityNotes",
    }),
  ],
});
