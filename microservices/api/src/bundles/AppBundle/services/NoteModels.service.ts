import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { EndUserService, SecurityService } from ".";
import { NoteModelsCollection } from "../collections";
import { EndUsersNoteModelsCreateInput } from "./inputs/EndUsersNoteModelsCreate.input";

@Service()
export class NoteModelsService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private noteModelsCollection: NoteModelsCollection;

  @Inject()
  private endUserService: EndUserService;

  // FIXME: why doesn't it work without (() => ...) ?
  @Inject(() => SecurityService)
  private securityService: SecurityService;

  public async create(input: EndUsersNoteModelsCreateInput, userId: ObjectId) {
    const { name, fields } = input;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    this.securityService.noteModels.checkCreateInputIsValid(input);

    const { insertedId } = await this.noteModelsCollection.insertOne(
      {
        name,
        fields,
        endUserId,
      },
      {
        context: {
          userId,
        },
      }
    );

    return insertedId;
  }
}
