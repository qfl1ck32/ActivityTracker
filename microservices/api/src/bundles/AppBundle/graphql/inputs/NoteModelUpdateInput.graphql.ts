export default /* GraphQL */ `
  input NoteModelUpdateInput {
    endUserId: ObjectId
    fields: [FieldInput]
    name: String
  }
`;
