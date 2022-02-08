export default /* GraphQL */ `
  input UserUpdateInput {
    avatarId: ObjectId
    isEnabled: Boolean
    profile: UserProfileInput
    roles: [UserRole]
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
