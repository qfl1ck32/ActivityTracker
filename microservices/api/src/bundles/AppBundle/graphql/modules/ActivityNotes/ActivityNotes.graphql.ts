export default /* GraphQL */ `
  type Query {
    ActivityNotesFindOne(query: QueryInput): ActivityNote
    ActivityNotesFindOneByID(_id: ObjectId!): ActivityNote
    ActivityNotesFind(query: QueryInput): [ActivityNote]!
    ActivityNotesCount(query: QueryInput): Int!
  }

  type Mutation {
    ActivityNotesInsertOne(document: ActivityNoteInsertInput!): ActivityNote
    ActivityNotesUpdateOne(
      _id: ObjectId!
      document: ActivityNoteUpdateInput!
    ): ActivityNote!
    ActivityNotesDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    ActivityNotesSubscription(body: EJSON): SubscriptionEvent
    ActivityNotesSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
