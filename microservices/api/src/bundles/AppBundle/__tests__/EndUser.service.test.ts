import { EndUserService } from "../services/EndUser.service";
import { container } from "../../../__tests__/ecosystem";
import { EndUsersCollection, UserRole, UsersCollection } from "../collections";
import { PermissionService } from "@bluelibs/security-bundle";
import { PermissionDomain } from "../permissions";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("EndUserService", () => {
  test("register()", async () => {
    const endUserService = container.get(EndUserService);
    const usersCollection = container.get(UsersCollection);
    const endUsersCollection = container.get(EndUsersCollection);

    const permissionService = container.get(PermissionService);

    const email = "mark-zucc@gmail.com";

    const registerInput = {
      firstName: "Mark",
      lastName: "Zucc",
      email,

      password: "test",
    };

    await endUserService.register(registerInput);

    const user = await usersCollection.findOne({
      "password.email": email,
    });

    expect(user).toBeTruthy();

    const endUser = await endUsersCollection.findOne({
      email,
    });

    expect(endUser).toBeTruthy();

    expect(endUser.ownerId).toStrictEqual(user._id);

    for (const field in registerInput) {
      expect(endUser[field]).toStrictEqual(registerInput[field]);
    }

    const permissions = await permissionService.findPermissions({
      userId: user._id,
    });

    expect(permissions).toHaveLength(1);
    expect(permissions[0].domain).toBe(PermissionDomain.APP);
    expect(permissions[0].permission).toBe(UserRole.END_USER);
  });
});
