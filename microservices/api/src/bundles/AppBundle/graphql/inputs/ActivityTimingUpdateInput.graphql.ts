export default /* GraphQL */ `
  input ActivityTimingUpdateInput {
    activityLogDetailsId: ObjectId
    endUserId: ObjectId
    finishedAt: Date
    name: String
    startedAt: Date
  }
`;
