export default /* GraphQL */ `
  input ActivityLogInsertInput {
    activityId: ObjectId!
    endUserId: ObjectId!
    noteModelId: ObjectId!
  }
`;
