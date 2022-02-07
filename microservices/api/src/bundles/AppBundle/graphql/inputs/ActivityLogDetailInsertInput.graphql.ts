export default /* GraphQL */ `
  input ActivityLogDetailInsertInput {
    activityLogId: ObjectId!
    endUserId: ObjectId!
    noteId: ObjectId!
    timingId: ObjectId!
  }
`;
