import { collection, field, relation, shortcuts } from "../utils";

export const EndUsers = collection({
  id: "EndUsers",

  representedBy: "fullName",

  behaviors: {
    blameable: true,
    softdeletable: true,
    timestampable: true,
  },

  fields: [
    field.string("firstName"),
    field.string("lastName"),

    field.string("email"),

    field.string("fullName", {
      isReducer: true,

      reducerDependency: {
        firstName: 1,
        lastName: 1,
      },
    }),

    ...shortcuts.fields.timestampable(),
  ],

  relations: [
    shortcuts.relation.user({ id: "owner" }),

    relation({
      id: "activityLogs",
      to: "ActivityLogs",

      isMany: true,

      unique: false,

      inversedBy: "endUser",
    }),

    ...shortcuts.relations.blameable(),
  ],
});
