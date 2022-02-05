export default /* GraphQL */ `
  input ActivityLogDetailInsertInput {
    activityLogId: ObjectId!
    endUserId: ObjectId!
    name: String!
    noteId: ObjectId!
    timingId: ObjectId!
  }
`;
