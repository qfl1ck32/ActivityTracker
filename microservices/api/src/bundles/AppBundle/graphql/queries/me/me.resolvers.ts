import * as X from "@bluelibs/x-bundle";
import { IGraphQLContext, IResolverMap } from "@bluelibs/graphql-bundle";
import { UsersCollection } from "@bundles/AppBundle/collections";

export default {
  Query: {
    me: [
      X.CheckLoggedIn(),
      async (_: any, _2: any, context: IGraphQLContext, ast: any) => {
        const userId = context.userId;
        const container = context.container;
        const usersCollection = container.get(UsersCollection);

        return usersCollection.queryOneGraphQL(ast, {
          filters: {
            _id: userId as any,
          },
          intersect: {
            _id: 1,

            email: 1,
            fullName: 1,
            roles: 1,
            profile: 1,
          },
        });
      },
    ],
  },
} as IResolverMap;
