export default /* GraphQL */ `
  type Field {
    id: String!
    name: String!
    isArray: Boolean!
    type: FieldType!
    enumValues: [FieldEnumValues]!
  }

  enum FieldType {
    BOOLEAN
    ENUM
    NUMBER
    STRING
    OBJECT
  }
`;
