export default /* GraphQL */ `
  input NoteModelUpdateInput {
    endUserId: ObjectId
    fields: [FieldInputWithEnumValues]
    name: String
  }
`;
