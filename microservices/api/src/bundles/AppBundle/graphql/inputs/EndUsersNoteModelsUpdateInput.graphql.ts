export default /* GraphQL */ `
  input EndUsersNoteModelsUpdateInput {
    noteModelId: ObjectId!
    fields: [FieldInputWithId]!
    name: String
  }
`;
