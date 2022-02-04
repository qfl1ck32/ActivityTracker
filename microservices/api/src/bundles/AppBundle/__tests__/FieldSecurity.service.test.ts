import { FieldSecurityService } from "../services/FieldSecurity.service";
import { container } from "../../../__tests__/ecosystem";
import { Field, FieldType } from "../collections";
import {
  FieldEnumValuesAreMissingException,
  FieldEnumValuesAreNotUnique,
  FieldTypeIsNotEnumButEnumValuesWereGivenException,
} from "../exceptions";
import { FieldValueIsNotValidException } from "../exceptions/FieldValueIsNotValid.exception";
import { FieldInput } from "../services/inputs";

// Jest Setup & Teardown: https://jestjs.io/docs/en/setup-teardown
// API: https://jestjs.io/docs/en/api
// Expect: https://jestjs.io/docs/en/expect

describe("FieldSecurityService", () => {
  test("checkFieldIsValid()", async () => {
    const fieldSecurityService = container.get(FieldSecurityService);

    const check = (field: FieldInput) => () =>
      fieldSecurityService.checkFieldIsValid(field);

    expect(
      check({
        name: "name",
        type: FieldType.ENUM,
        enumValues: [],
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
          id: "a",
          name,
          type: FieldType.ENUM,
          enumValues: [],
        },
        "test"
      )
    ).toThrowError(new FieldValueIsNotValidException({ fieldName }));

    expect(
      check(
        {
          id: "a",
          name,
          type: FieldType.ENUM,
          enumValues: [
            {
              id: "abc",
              value: "test",
            },
          ],
        },
        "abc"
      )
    ).not.toThrow();

    // BOOLEAN
    expect(
      check(
        {
          id: "a",
          name,
          type: FieldType.BOOLEAN,
          enumValues: [],
        },
        true
      )
    ).not.toThrow();

    expect(
      check(
        {
          id: "a",
          name,
          type: FieldType.BOOLEAN,
          enumValues: [],
        },
        false
      )
    ).not.toThrow();

    expect(
      check(
        {
          id: "a",
          name,
          type: FieldType.BOOLEAN,
          enumValues: [],
        },
        "test"
      )
    ).toThrowError(new FieldValueIsNotValidException({ fieldName }));

    expect(
      check(
        {
          id: "a",
          name,
          type: FieldType.STRING,
          enumValues: [],
        },
        "test"
      )
    ).not.toThrow();
  });
});
