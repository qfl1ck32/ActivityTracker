export default /* GraphQL */ `
  input FieldCreateInput {
    id: String
    name: String!
    type: FieldType!
    enumValues: [String]!
  }
`;
