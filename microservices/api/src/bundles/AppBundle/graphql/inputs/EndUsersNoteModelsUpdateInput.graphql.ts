export default /* GraphQL */ `
  input EndUsersNoteModelsUpdateInput {
    noteModelId: ObjectId!
    fields: [FieldInput]!
    name: String
  }
`;
