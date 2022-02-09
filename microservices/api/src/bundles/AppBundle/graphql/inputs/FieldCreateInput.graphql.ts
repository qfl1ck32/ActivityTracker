export default /* GraphQL */ `
  input FieldCreateInput {
    id: String
    name: String!

    isArray: Boolean!

    type: FieldType!
    enumValues: [String]!
  }
`;
