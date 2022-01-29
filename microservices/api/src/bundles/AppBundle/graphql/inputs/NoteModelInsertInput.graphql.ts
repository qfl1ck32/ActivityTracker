export default /* GraphQL */ `
  input NoteModelInsertInput {
    endUserId: ObjectId!
    fields: [FieldInput]!
    name: String!
  }
`;
