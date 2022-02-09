import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
// TODO: import from lodash-es, three shake
import { uniq } from "lodash";
import { FieldSecurityService } from "./FieldSecurity.service";
import { Field, FieldEnumValues, NoteModelsCollection } from "../collections";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";
import { FieldNamesAreNotUniqueException } from "../exceptions/FieldNamesAreNotUnique.exception";
import { NoteModelNameAlreadyExistsException } from "../exceptions/NoteModelNameAlreadyExists.exception";
import { NoteModelsFieldsAreMissingException } from "../exceptions/NoteModelsFieldsAreMissing.exception";
import { NoteModelsTypeOfExistingFieldCanNotBeChangedException } from "../exceptions/NoteModelsTypeOfExistingFieldCanNotBeChanged.exception";
import { NoteModelsUpdateFieldsInputIsInvalidException } from "../exceptions/NoteModelsUpdateFieldsInputIsInvalid.exception";
import { FieldCreateInput } from "./inputs";

@Service()
export class NoteModelsSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private noteModelsCollection: NoteModelsCollection;

  @Inject(() => FieldSecurityService)
  private fieldSecurityService: FieldSecurityService;

  public async checkEndUserOwnsNoteModel(
    noteModelId: ObjectId,
    endUserId: ObjectId
  ) {
    const numberOfNoteModelsByIdAndEndUserId =
      await this.noteModelsCollection.count({
        _id: noteModelId,
        endUserId,
      });

    if (numberOfNoteModelsByIdAndEndUserId === 0) {
      throw new EndUserDoesNotOwnNoteModelException();
    }
  }

  public async checkFieldsInputIsValid<
    T extends { fields: (Field | FieldCreateInput)[] }
  >(
    input: T,

    noteModelId?: ObjectId
  ) {
    const { fields } = input;

    if (fields.length === 0) {
      throw new NoteModelsFieldsAreMissingException();
    }

    if (noteModelId) {
      const { fields: noteModelFields } =
        await this.noteModelsCollection.findOne({ _id: noteModelId });

      const oldFieldsById = {} as Record<string, Field>;
      const oldFieldsByName = {} as Record<string, Field>;

      for (const field of noteModelFields) {
        oldFieldsById[field.id] = field;
        oldFieldsByName[field.name] = field;
      }

      for (const field of fields) {
        const currentField = field as Field;

        const previousFieldById = oldFieldsById[(field as Field).id];
        const previousFieldByName = oldFieldsByName[(field as Field).name];

        if (currentField.id && !previousFieldById) {
          throw new NoteModelsUpdateFieldsInputIsInvalidException();
        }

        if (
          (currentField.id &&
            previousFieldById &&
            currentField.type !== previousFieldById.type) ||
          (!currentField.id &&
            previousFieldByName &&
            currentField.type !== previousFieldByName.type)
        ) {
          throw new NoteModelsTypeOfExistingFieldCanNotBeChangedException();
        }

        const oldEnumValues = {} as Record<string, FieldEnumValues>;

        if (!previousFieldById) continue;

        for (const enumValue of previousFieldById.enumValues) {
          oldEnumValues[enumValue.id] = enumValue;
        }

        for (const enumValue of currentField.enumValues) {
          const previousEnumValue = oldEnumValues[enumValue.id];

          if (enumValue.id && !previousEnumValue) {
            throw new NoteModelsUpdateFieldsInputIsInvalidException();
          }
        }
      }
    }

    const fieldNames = fields.map((field) => field.name);

    if (uniq(fieldNames).length !== fields.length) {
      throw new FieldNamesAreNotUniqueException();
    }

    fields.forEach((field) =>
      this.fieldSecurityService.checkFieldIsValid(field)
    );
  }

  public async checkEndUserDoesNotHaveNoteModelWithTheSameName(
    name: string,
    endUserId: ObjectId
  ) {
    const numberOfNoteModelsByNameAndEndUserId =
      await this.noteModelsCollection.count({
        name,
        endUserId,
      });

    if (numberOfNoteModelsByNameAndEndUserId > 0) {
      throw new NoteModelNameAlreadyExistsException();
    }
  }
}
