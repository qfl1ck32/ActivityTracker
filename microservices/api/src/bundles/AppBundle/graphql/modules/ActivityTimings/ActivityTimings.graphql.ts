export default /* GraphQL */ `
  type Query {
    ActivityTimingsFindOne(query: QueryInput): ActivityTiming
    ActivityTimingsFindOneByID(_id: ObjectId!): ActivityTiming
    ActivityTimingsFind(query: QueryInput): [ActivityTiming]!
    ActivityTimingsCount(query: QueryInput): Int!
  }

  type Mutation {
    ActivityTimingsInsertOne(
      document: ActivityTimingInsertInput!
    ): ActivityTiming
    ActivityTimingsUpdateOne(
      _id: ObjectId!
      document: ActivityTimingUpdateInput!
    ): ActivityTiming!
    ActivityTimingsDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    ActivityTimingsSubscription(body: EJSON): SubscriptionEvent
    ActivityTimingsSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
