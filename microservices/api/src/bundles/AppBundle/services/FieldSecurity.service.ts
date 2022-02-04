import { ContainerInstance, Service } from "@bluelibs/core";
// TODO: import from lodash-es, three shake
import { uniq } from "lodash";
import { Field, FieldEnumValues, FieldType } from "../collections";
import {
  FieldEnumValuesAreMissingException,
  FieldValueIsNotValidException,
} from "../exceptions";
import { FieldEnumValuesAreNotUnique } from "../exceptions/FieldEnumValuesAreNotUnique.exception";
import { FieldTypeIsNotEnumButEnumValuesWereGivenException } from "../exceptions/FieldTypeIsNotEnumButEnumValuesWereGiven.exception";
import { FieldInput } from "./inputs";

@Service()
export class FieldSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  public checkFieldIsValid(field: Field | FieldInput) {
    const { name, type, enumValues } = field;

    if (type !== FieldType.ENUM) {
      if (enumValues.length) {
        throw new FieldTypeIsNotEnumButEnumValuesWereGivenException();
      }
    }

    switch (type) {
      case FieldType.ENUM:
        return this.checkEnumValuesAreValid(enumValues, name);
    }
  }

  public checkFieldValueIsValid(field: Field, value: any) {
    const { name: fieldName, type, enumValues } = field;

    if (value === undefined) return; // TODO: think, is this right?

    switch (type) {
      case FieldType.ENUM:
        return this.checkEnumFieldValueIsValid(value, fieldName, enumValues);

      case FieldType.BOOLEAN:
        return this.checkBooleanFieldValueIsValid(value, fieldName);

      case FieldType.STRING:
        return; // TODO: any type of check here?

      case FieldType.NUMBER:
        return this.checkNumberFieldValueIsValid(value, fieldName);
    }
  }

  private checkEnumFieldValueIsValid(
    value: any,
    fieldName: string,
    enumValues: FieldEnumValues[]
  ) {
    if (!enumValues?.some((enumValue) => enumValue.id === value)) {
      throw new FieldValueIsNotValidException({
        fieldName,
      });
    }
  }

  private checkBooleanFieldValueIsValid(value: any, fieldName: string) {
    if (value !== true && value !== false) {
      throw new FieldValueIsNotValidException({ fieldName });
    }
  }

  private checkNumberFieldValueIsValid(value: any, fieldName: string) {
    if (!Number.isInteger(value)) {
      throw new FieldValueIsNotValidException({ fieldName });
    }
  }

  private checkEnumValuesAreValid(
    enumValues: (string | FieldEnumValues)[],
    fieldName: string
  ) {
    if (!enumValues.length) {
      throw new FieldEnumValuesAreMissingException();
    }

    if (uniq(enumValues).length !== enumValues.length) {
      throw new FieldEnumValuesAreNotUnique({ fieldName });
    }
  }
}
