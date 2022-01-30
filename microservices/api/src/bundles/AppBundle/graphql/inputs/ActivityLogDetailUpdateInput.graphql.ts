export default /* GraphQL */ `
  input ActivityLogDetailUpdateInput {
    activityLogId: ObjectId
    endUserId: ObjectId
    name: String
    noteId: ObjectId
    timingId: ObjectId
  }
`;
