export default /* GraphQL */ `
  type Query {
    NoteModelsFindOne(query: QueryInput): NoteModel
    NoteModelsFindOneByID(_id: ObjectId!): NoteModel
    NoteModelsFind(query: QueryInput): [NoteModel]!
    NoteModelsCount(query: QueryInput): Int!
  }

  type Mutation {
    NoteModelsInsertOne(document: NoteModelInsertInput!): NoteModel
    NoteModelsUpdateOne(
      _id: ObjectId!
      document: NoteModelUpdateInput!
    ): NoteModel!
    NoteModelsDeleteOne(_id: ObjectId!): Boolean
  }

  type Subscription {
    NoteModelsSubscription(body: EJSON): SubscriptionEvent
    NoteModelsSubscriptionCount(filters: EJSON): SubscriptionCountEvent
  }
`;
