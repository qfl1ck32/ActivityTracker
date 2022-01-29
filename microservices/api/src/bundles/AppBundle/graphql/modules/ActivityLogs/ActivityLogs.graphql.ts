export default /* GraphQL */ `
  type Query {
    ActivityLogsFindOne(query: QueryInput): ActivityLog
    ActivityLogsFindOneByID(_id: ObjectId!): ActivityLog
    ActivityLogsFind(query: QueryInput): [ActivityLog]!
    ActivityLogsCount(query: QueryInput): Int!
  }

  type Mutation {
    ActivityLogsInsertOne(document: ActivityLogInsertInput!): ActivityLog
    ActivityLogsUpdateOne(
      _id: ObjectId!
      document: ActivityLogUpdateInput!
    ): ActivityLog!
    ActivityLogsDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    ActivityLogsSubscription(body: EJSON): SubscriptionEvent
    ActivityLogsSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
