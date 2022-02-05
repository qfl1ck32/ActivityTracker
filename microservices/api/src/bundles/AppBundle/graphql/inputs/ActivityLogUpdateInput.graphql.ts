export default /* GraphQL */ `
  input ActivityLogUpdateInput {
    activityId: ObjectId
    endUserId: ObjectId
    isFinished: Boolean
    name: String
    noteModelId: ObjectId
  }
`;
