export default /* GraphQL */ `
  input ActivityTimingInsertInput {
    activityLogId: ObjectId!
    endUserId: ObjectId!
    finishedAt: Date
    name: String!
    startedAt: Date!
  }
`;
