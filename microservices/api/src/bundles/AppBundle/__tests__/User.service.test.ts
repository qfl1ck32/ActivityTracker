import { UserService } from "../services/User.service";
import { container } from "../../../__tests__/ecosystem";
import { createEndUser, getUser } from "./utilities";
import { mockImage } from "./utilities/files";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("UserService", () => {
  /**
   * This has been tested
   */
  test.skip("uploadAvatar()", async () => {
    const userService = container.get(UserService);

    const { userId } = await createEndUser();

    const avatar = mockImage;

    let user = await getUser(userId);

    expect(user.avatarId).toBeFalsy();

    await userService.uploadAvatar(
      {
        avatar,
      },
      userId
    );

    user = await getUser(userId);
    expect(user.avatarId).toBeTruthy();

    await userService.uploadAvatar(
      {
        avatar: null,
      },
      userId
    );

    user = await getUser(userId);
    expect(user.avatarId).toBeFalsy();
  });
});
