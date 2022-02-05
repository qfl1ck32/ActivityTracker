export default /* GraphQL */ `
  input ActivityLogDetailInsertInput {
    activityLogId: ObjectId!
    endUserId: ObjectId!
    isFinished: Boolean!
    name: String!
    noteId: ObjectId!
    timingId: ObjectId!
  }
`;
