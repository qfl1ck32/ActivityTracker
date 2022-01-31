import { FieldSecurityService } from "../services/FieldSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import { Field, FieldType } from "../collections";
import {
  FieldEnumValuesAreMissingException,
  FieldEnumValuesAreNotUnique,
  FieldTypeIsNotEnumButEnumValuesWereGivenException,
} from "../exceptions";
import { FieldValueIsNotValidException } from "../exceptions/FieldValueIsNotValid.exception";

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
        type: FieldType.NUMBER,
        enumValues: ["a", "b"],
      })
    ).toThrowError(new FieldTypeIsNotEnumButEnumValuesWereGivenException());

    expect(
      check({
        name: "name",
        type: FieldType.ENUM,
        enumValues: ["a", "b"],
      })
    ).not.toThrow();
  });

  test("checkFieldValueIsValid()", async () => {
    const fieldSecurityService = container.get(FieldSecurityService);

    const check = (field: Field, value: any) => () =>
      fieldSecurityService.checkFieldValueIsValid(field, value);

    const name = "name";
    const fieldName = name;

    // ENUM
    expect(
      check(
        {
          name,
          type: FieldType.ENUM,
        },
        "test"
      )
    ).toThrowError(new FieldValueIsNotValidException({ fieldName }));

    // BOOLEAN
    expect(
      check(
        {
          name,
          type: FieldType.BOOLEAN,
        },
        true
      )
    ).not.toThrow();

    expect(
      check(
        {
          name,
          type: FieldType.BOOLEAN,
        },
        false
      )
    ).not.toThrow();

    expect(
      check(
        {
          name,
          type: FieldType.BOOLEAN,
        },
        "test"
      )
    ).toThrowError(new FieldValueIsNotValidException({ fieldName }));

    expect(
      check(
        {
          name,
          type: FieldType.STRING,
        },
        "test"
      )
    ).not.toThrow();
  });
});
