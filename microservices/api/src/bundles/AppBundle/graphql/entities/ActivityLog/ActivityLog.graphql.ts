export default /* GraphQL */ `
  type ActivityLog {
    _id: ObjectId
    activity: Activity!
    activityId: ObjectId!

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
    details: [ActivityLogDetail]!
    endUser: EndUser!
    endUserId: ObjectId!
    name: String!
    noteModel: NoteModel!
    noteModelId: ObjectId!

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
  }
`;
