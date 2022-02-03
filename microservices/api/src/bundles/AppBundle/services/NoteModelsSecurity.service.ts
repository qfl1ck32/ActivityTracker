import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
// TODO: import from lodash-es, three shake
import { uniq } from "lodash";
import { FieldSecurityService } from ".";
import { NoteModelsCollection } from "../collections";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";
import { FieldNamesAreNotUniqueException } from "../exceptions/FieldNamesAreNotUnique.exception";
import { NoteModelNameAlreadyExistsException } from "../exceptions/NoteModelNameAlreadyExists.exception";
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

  public checkFieldsInputIsValid<T extends { fields: FieldInput[] }>(input: T) {
    const { fields } = input;

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
