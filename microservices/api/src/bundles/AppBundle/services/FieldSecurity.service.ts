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
import { FieldEnumValuesAreMissingException } from "../exceptions";

@Service()
export class FieldSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  public checkFieldIsValid(field: Field) {
    const { name, type, enumValues } = field;

    switch (type) {
      case FieldType.ENUM:
        this.checkEnumValuesAreValid(enumValues, name);
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
