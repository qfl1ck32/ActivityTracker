export default /* GraphQL */ `
  input FieldInput {
    name: String!
    type: FieldType!
    enumValues: [String]
  }

  input FieldInputWithId {
    id: String

    name: String!
    type: FieldType!
    enumValues: [String]
  }
`;
