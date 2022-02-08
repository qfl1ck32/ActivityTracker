export default /* GraphQL */ `
  input UserInsertInput {
    avatarId: ObjectId
    isEnabled: Boolean!
    profile: UserProfileInput!
    roles: [UserRole]!
  }

  input UserProfileInput {
    firstName: String!
    lastName: String!
  }
`;
