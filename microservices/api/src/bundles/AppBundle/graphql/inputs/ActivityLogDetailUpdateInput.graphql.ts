export default /* GraphQL */ `
  input ActivityLogDetailUpdateInput {
    activityLogId: ObjectId
    endUserId: ObjectId
    isFinished: Boolean
    name: String
    noteId: ObjectId
    timingId: ObjectId
  }
`;
