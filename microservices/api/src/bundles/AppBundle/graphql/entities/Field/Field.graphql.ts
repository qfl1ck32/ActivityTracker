export default /* GraphQL */ `
  type Field {
    name: String!
    type: FieldType!
    enumValues: [String]
  }

  enum FieldType {
    BOOLEAN
    ENUM
    DATE
    STRING
  }
`;
