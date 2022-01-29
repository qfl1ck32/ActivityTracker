export default /* GraphQL */ `
  type Query {
    ActivitiesFindOne(query: QueryInput): Activity
    ActivitiesFindOneByID(_id: ObjectId!): Activity
    ActivitiesFind(query: QueryInput): [Activity]!
    ActivitiesCount(query: QueryInput): Int!
  }

  type Mutation {
    ActivitiesInsertOne(document: ActivityInsertInput!): Activity
    ActivitiesUpdateOne(
      _id: ObjectId!
      document: ActivityUpdateInput!
    ): Activity!
    ActivitiesDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    ActivitiesSubscription(body: EJSON): SubscriptionEvent
    ActivitiesSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
