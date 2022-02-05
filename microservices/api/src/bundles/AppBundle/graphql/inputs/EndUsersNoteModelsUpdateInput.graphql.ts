export default /* GraphQL */ `
  input EndUsersNoteModelsUpdateInput {
    noteModelId: ObjectId!
    fields: [FieldInputWithEnumValues]
    name: String
  }
`;
