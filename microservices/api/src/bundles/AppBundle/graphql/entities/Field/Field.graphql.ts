export default /* GraphQL */ `
  type Field {
    id: String!
    name: String!
    type: FieldType!
    enumValues: [FieldEnumValues]!
  }

  enum FieldType {
    BOOLEAN
    ENUM
    NUMBER
    STRING
  }
`;
