export default /* GraphQL */ `
  type Field {
    id: String!
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
