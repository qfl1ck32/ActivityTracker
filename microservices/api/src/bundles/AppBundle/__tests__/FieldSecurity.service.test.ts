import { FieldSecurityService } from "../services/FieldSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import { Field, FieldType } from "../collections";
import {
  FieldEnumValuesAreMissingException,
  FieldEnumValuesAreNotUnique,
} from "../exceptions";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("FieldSecurityService", () => {
  test("checkFieldIsValid()", async () => {
    const fieldSecurityService = container.get(FieldSecurityService);

    const check = (field: Field) => () =>
      fieldSecurityService.checkFieldIsValid(field);

    expect(
      check({
        name: "name",
        type: FieldType.ENUM,
      })
    ).toThrowError(new FieldEnumValuesAreMissingException());

    expect(
      check({
        name: "name",
        type: FieldType.ENUM,
        enumValues: ["A", "A"],
      })
    ).toThrowError(new FieldEnumValuesAreNotUnique({ fieldName: "name" }));

    expect(
      check({
        name: "name",
        type: FieldType.ENUM,
        enumValues: ["a", "b"],
      })
    ).not.toThrow();
  });
});
