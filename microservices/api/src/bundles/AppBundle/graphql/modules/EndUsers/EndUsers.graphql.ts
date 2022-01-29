export default /* GraphQL */ `
  type Query {
    EndUsersFindOne(query: QueryInput): EndUser
    EndUsersFindOneByID(_id: ObjectId!): EndUser
    EndUsersFind(query: QueryInput): [EndUser]!
    EndUsersCount(query: QueryInput): Int!
  }

  type Mutation {
    EndUsersInsertOne(document: EndUserInsertInput!): EndUser
    EndUsersUpdateOne(_id: ObjectId!, document: EndUserUpdateInput!): EndUser!
    EndUsersDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    EndUsersSubscription(body: EJSON): SubscriptionEvent
    EndUsersSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
