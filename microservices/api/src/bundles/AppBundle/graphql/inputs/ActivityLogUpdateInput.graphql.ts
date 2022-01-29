export default /* GraphQL */ `
  input ActivityLogUpdateInput {
    activityId: ObjectId
    endUserId: ObjectId
    name: String
    noteModelId: ObjectId
  }
`;
