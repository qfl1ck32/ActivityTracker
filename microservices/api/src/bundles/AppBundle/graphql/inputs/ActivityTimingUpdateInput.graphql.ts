export default /* GraphQL */ `
  input ActivityTimingUpdateInput {
    activityLogDetailId: ObjectId
    endUserId: ObjectId
    finishedAt: Date
    startedAt: Date
  }
`;
