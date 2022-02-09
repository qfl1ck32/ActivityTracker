export default /* GraphQL */ `
  input FieldInput {
    id: String!
    name: String!
    isArray: Boolean!
    type: FieldType!
    enumValues: [FieldEnumValuesInput]!
  }
`;
