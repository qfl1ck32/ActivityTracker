export default /* GraphQL */ `
  input ActivityLogInsertInput {
    activityId: ObjectId!
    endUserId: ObjectId!
    name: String!
    noteModelId: ObjectId!
  }
`;
