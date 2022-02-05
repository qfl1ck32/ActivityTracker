export default /* GraphQL */ `
  input FieldInput {
    id: String
    name: String!
    type: FieldType!
    enumValues: [String]!
  }

  input FieldInputWithEnumValues {
    id: String
    name: String!
    type: FieldType!

    enumValues: [FieldEnumValuesInput]!
  }
`;
