export default /* GraphQL */ `
  input ActivityTimingInsertInput {
    activityLogDetailId: ObjectId!
    endUserId: ObjectId!
    finishedAt: Date
    startedAt: Date!
  }
`;
