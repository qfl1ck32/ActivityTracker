import { UsersSecurityService } from "../services/UsersSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import { createEndUser, createUser, endUsersRegisterInput } from "./utilities";
import { UsernameAlreadyExistsException } from "@bluelibs/password-bundle";
import { ObjectId } from "@bluelibs/ejson";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("UsersSecurityService", () => {
  test("checkEmailIsNotTaken()", async () => {
    const usersSecurityService = container.get(UsersSecurityService);

    const email = "test@app.com";

    await expect(
      usersSecurityService.checkEmailIsNotTaken(email, null)
    ).resolves.not.toThrow();

    const userId = await createUser({
      email,

      password: {
        email,
        username: email,
      },
    });

    await expect(
      usersSecurityService.checkEmailIsNotTaken(
        email,
        new ObjectId("a".repeat(24))
      )
    ).rejects.toThrow(
      new UsernameAlreadyExistsException({
        username: email,
      })
    );

    await expect(
      usersSecurityService.checkEmailIsNotTaken(email, userId)
    ).resolves.not.toThrow();
  });
});
