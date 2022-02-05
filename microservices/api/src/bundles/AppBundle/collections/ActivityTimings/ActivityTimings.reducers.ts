import { IReducerOption } from "@bluelibs/nova";

// Export link names as constants with type of: IReducerOption, sample:
// export const myCustomLink: IReducerOption = { ... }

export const isFinished: IReducerOption = {
  dependency: { finishedAt: 1 },
  async reduce(parent) {
    return Boolean(parent.finishedAt);
  },
};
