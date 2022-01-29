export default /* GraphQL */ `
  type ActivityNote {
    _id: ObjectId
    activityLog: ActivityLog!
    activityLogId: ObjectId!

    """
    Represents the date when this object was created
    """
    createdAt: Date!

    """
    Represents the user who has created this object
    """
    createdBy: User

    """
    Represents the user's id who has created this object
    """
    createdById: ObjectId
    endUser: EndUser!
    endUserId: ObjectId!

    """
    Represents the last time when the object was updated
    """
    updatedAt: Date!

    """
    Represents the user who has made the latest update on this object
    """
    updatedBy: User

    """
    Represents the user's id who has made the latest update on this object
    """
    updatedById: ObjectId

    """
    We are representing the value as an object, because we don't have an exact representation of how the note will look like.
    """
    value: String!
  }
`;
