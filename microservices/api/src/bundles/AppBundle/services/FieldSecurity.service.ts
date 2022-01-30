import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { Field, FieldType } from "../collections";

// TODO: import from lodash-es, three shake
import { uniq } from "lodash";
import { FieldEnumValuesAreNotUnique } from "../exceptions/FieldEnumValuesAreNotUnique.exception";
import {
  FieldEnumValuesAreMissingException,
  FieldValueIsNotValidException,
} from "../exceptions";

@Service()
export class FieldSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  public checkFieldIsValid(field: Field) {
    const { name, type, enumValues } = field;

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
