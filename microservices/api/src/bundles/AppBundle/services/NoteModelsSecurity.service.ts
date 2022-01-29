import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { NoteModelsCollection } from "../collections";
import { EndUserDoesNotOwnNoteModelException } from "../exceptions/EndUserDoesNotOwnNoteModel.exception";

@Service()
export class NoteModelsSecurityService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private noteModelsCollection: NoteModelsCollection;

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
}
