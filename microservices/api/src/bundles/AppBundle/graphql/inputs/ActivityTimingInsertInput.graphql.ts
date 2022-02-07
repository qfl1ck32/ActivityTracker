export default /* GraphQL */ `
  input ActivityTimingInsertInput {
    activityLogDetailsId: ObjectId!
    endUserId: ObjectId!
    finishedAt: Date
    startedAt: Date!
  }
`;
