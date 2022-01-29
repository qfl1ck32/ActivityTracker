export default /* GraphQL */ `
  type NoteModel {
    _id: ObjectId

    """
    Represents the date when this object was created
    """
    createdAt: Date!
    endUser: EndUser!
    endUserId: ObjectId!
    fields: [Field]!
    name: String!

    """
    Represents the last time when the object was updated
    """
    updatedAt: Date!
  }
`;
