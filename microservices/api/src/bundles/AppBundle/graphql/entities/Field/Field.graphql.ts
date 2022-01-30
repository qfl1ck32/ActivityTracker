export default /* GraphQL */ `
  type Field {
    name: String!
    type: FieldType!
    enumValues: [String]
  }

  enum FieldType {
    BOOLEAN
    ENUM
    NUMBER
    STRING
  }
`;
