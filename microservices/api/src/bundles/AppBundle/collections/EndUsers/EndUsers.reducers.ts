import { IReducerOption } from "@bluelibs/nova";

// Export link names as constants with type of: IReducerOption, sample:
// export const myCustomLink: IReducerOption = { ... }

export const fullName: IReducerOption = {
  dependency: { firstName: 1, lastName: 1 },
  async reduce(parent, { context }) {
    // You can access the container via: context.container
    return "Not Implemented";
  },
};
