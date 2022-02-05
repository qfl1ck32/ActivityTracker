import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
// TODO: import from lodash-es, three shake
import { uniq } from "lodash";
import { FieldSecurityService } from ".";
import { Field, NoteModelsCollection } from "../collections";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";
import { FieldNamesAreNotUniqueException } from "../exceptions/FieldNamesAreNotUnique.exception";
import { NoteModelNameAlreadyExistsException } from "../exceptions/NoteModelNameAlreadyExists.exception";
import { NoteModelsUpdateFieldsInputIsInvalidException } from "../exceptions/NoteModelsUpdateFieldsInputIsInvalid.exception";
import { FieldInput } from "./inputs";

@Service()
export class NoteModelsSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private noteModelsCollection: NoteModelsCollection;

  @Inject()
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

  public async checkFieldsInputIsValid<T extends { fields: (Field | FieldInput)[] }>(
    input: T,

    noteModelId?: ObjectId
  ) {
    const { fields } = input

    if (noteModelId) {
      const { fields: noteModelFields } = await this.noteModelsCollection.findOne({_id: noteModelId})

      const oldIds = {} as Record<string, boolean>

      for (const field of noteModelFields) {
        oldIds[field.id] = true;
      }

      for (const field of fields) {

        if ((field as Field).id && !oldIds[(field as Field).id]) {
          throw new NoteModelsUpdateFieldsInputIsInvalidException()
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
