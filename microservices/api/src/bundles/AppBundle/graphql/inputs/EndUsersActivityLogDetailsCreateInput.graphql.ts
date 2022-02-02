export default /* GraphQL */ `
  input EndUsersActivityLogDetailsCreateInput {
    activityLogId: ObjectId!

    startedAt: Date!
    finishedAt: Date!

    noteDetailsValue: String
  }
`;
