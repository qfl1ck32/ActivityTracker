import { ContainerInstance, Service } from "@bluelibs/core";
// TODO: import from lodash-es, three shake
import { uniq } from "lodash";
import { Field, FieldType } from "../collections";
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

  public checkFieldIsValid(field: FieldInput) {
    const { name, type, enumValues } = field;

    if (type !== FieldType.ENUM) {
      if (Boolean(enumValues)) {
        throw new FieldTypeIsNotEnumButEnumValuesWereGivenException();
      }
    }

    switch (type) {
      case FieldType.ENUM:
        return this.checkEnumValuesAreValid(enumValues, name);
    }
  }

  public checkInputFieldValueIsValid(field: FieldInput, value: any) {
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
    enumValues: string[]
  ) {
    if (!enumValues?.includes(value)) {
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

  private checkEnumValuesAreValid(enumValues: string[], fieldName: string) {
    if (!enumValues?.length) {
      throw new FieldEnumValuesAreMissingException();
    }

    if (uniq(enumValues).length !== enumValues.length) {
      throw new FieldEnumValuesAreNotUnique({ fieldName });
    }
  }
}
