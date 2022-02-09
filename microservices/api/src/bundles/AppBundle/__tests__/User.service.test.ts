import { UserService } from "../services/User.service";
import { container } from "../../../__tests__/ecosystem";
import { createEndUser, createUser, getUser } from "./utilities";
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

  test("updateProfile()", async () => {
    const userService = container.get(UserService);

    const email = "abc@app.com";
    const firstName = "newFirstName";
    const lastName = "newLastName";

    const userId = await createUser({
      password: {
        email,
      },
    });

    await userService.updateProfile(
      {
        email,
        firstName,
        lastName,
      },
      userId
    );

    const user = await getUser(userId);

    expect(user.profile).toStrictEqual({
      firstName,
      lastName,
    });
  });
});
