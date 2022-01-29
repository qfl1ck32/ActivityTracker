export default /* GraphQL */ `
  input ActivityTimingUpdateInput {
    activityLogId: ObjectId
    endUserId: ObjectId
    finishedAt: Date
    name: String
    startedAt: Date
  }
`;
