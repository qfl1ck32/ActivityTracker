export default /* GraphQL */ `
  input ActivityTimingUpdateInput {
    activityLogDetailsId: ObjectId
    endUserId: ObjectId
    finishedAt: Date
    startedAt: Date
  }
`;
