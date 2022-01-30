export default /* GraphQL */ `
  input ActivityTimingInsertInput {
    activityLogDetailsId: ObjectId!
    endUserId: ObjectId!
    finishedAt: Date
    name: String!
    startedAt: Date!
  }
`;
