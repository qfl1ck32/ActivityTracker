export default /* GraphQL */ `
  input FieldInput {
    id: String
    name: String!
    type: FieldType!
    enumValues: [String]!
  }
`;
