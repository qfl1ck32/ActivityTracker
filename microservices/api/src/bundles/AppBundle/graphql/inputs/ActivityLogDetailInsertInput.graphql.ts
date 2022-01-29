export default /* GraphQL */ `
  input ActivityLogDetailInsertInput {
    activityLogId: ObjectId!
    name: String!
    notesId: ObjectId!
    timingId: ObjectId!
  }
`;
