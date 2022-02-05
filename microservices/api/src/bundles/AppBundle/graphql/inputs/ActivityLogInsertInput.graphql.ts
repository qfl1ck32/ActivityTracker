export default /* GraphQL */ `
  input ActivityLogInsertInput {
    activityId: ObjectId!
    endUserId: ObjectId!
    isFinished: Boolean!
    name: String!
    noteModelId: ObjectId!
  }
`;
