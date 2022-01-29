export default /* GraphQL */ `
  type Query {
    ActivityLogDetailsFindOne(query: QueryInput): ActivityLogDetail
    ActivityLogDetailsFindOneByID(_id: ObjectId!): ActivityLogDetail
    ActivityLogDetailsFind(query: QueryInput): [ActivityLogDetail]!
    ActivityLogDetailsCount(query: QueryInput): Int!
  }

  type Mutation {
    ActivityLogDetailsInsertOne(
      document: ActivityLogDetailInsertInput!
    ): ActivityLogDetail
    ActivityLogDetailsUpdateOne(
      _id: ObjectId!
      document: ActivityLogDetailUpdateInput!
    ): ActivityLogDetail!
    ActivityLogDetailsDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    ActivityLogDetailsSubscription(body: EJSON): SubscriptionEvent
    ActivityLogDetailsSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
