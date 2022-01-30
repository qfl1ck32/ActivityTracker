export default /* GraphQL */ `
  input ActivityNoteUpdateInput {
    activityLogDetailsId: ObjectId
    endUserId: ObjectId

    """
    We are representing the value as an object, because we don't have an exact representation of how the note will look like.
    """
    value: String
  }
`;
