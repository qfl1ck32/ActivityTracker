export default /* GraphQL */ `
  input FieldInputWithEnumValues {
    id: String

    name: String!
    type: FieldType!

    isArray: Boolean!

    enumValues: [FieldEnumValuesCreateInput]!
  }
`;
