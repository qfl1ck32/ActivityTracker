import {
  Service,
  Inject,
  EventManager,
  ContainerInstance,
} from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
import { ActivityNotesService, EndUserService, SecurityService } from ".";
import { Field, NoteModelsCollection } from "../collections";
import { EndUsersNoteModelsCreateInput } from "./inputs/EndUsersNoteModelsCreate.input";
import { EndUsersNoteModelsUpdateInput } from "./inputs/EndUsersNoteModelsUpdate.input";

// TODO :(
import * as crypto from "crypto";

import { pickBy } from "lodash";

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

  @Inject(() => ActivityNotesService)
  private activityNotesService: ActivityNotesService;

  public async create(input: EndUsersNoteModelsCreateInput, userId: ObjectId) {
    const { name } = input;

    const inputFields = input.fields;

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    this.securityService.noteModels.checkFieldsInputIsValid(input);

    await this.securityService.noteModels.checkEndUserDoesNotHaveNoteModelWithTheSameName(
      name,
      endUserId
    );

    const fields = [] as Field[];

    for (const field of inputFields) {
      fields.push({
        id: crypto.randomUUID(),
        ...field,
      });
    }

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

    return this.noteModelsCollection.findOne({
      _id: insertedId,
    });
  }

  public async update(input: EndUsersNoteModelsUpdateInput, userId: ObjectId) {
    const { fields, noteModelId, ...restOfFieldsToUpdate } = input;

    if (fields?.length) {
      this.securityService.noteModels.checkFieldsInputIsValid({ fields });

      const { fields: oldFields } = await this.noteModelsCollection.findOne({
        _id: noteModelId,
      });

      await this.activityNotesService.syncWithNewFields(
        oldFields,
        fields,
        noteModelId
      );
    }

    const updates = pickBy({ fields, ...restOfFieldsToUpdate }, Boolean);

    await this.noteModelsCollection.updateOne(
      {
        _id: noteModelId,
      },
      {
        $set: updates,
      }
    );
  }

  public async getAll(userId: ObjectId) {
    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    return this.noteModelsCollection.query({
      $: {
        filters: {
          endUserId,
        },
      },

      _id: 1,
      name: 1,
      fields: {
        name: 1,
        type: 1,
        enumValues: 1,
      },
      createdAt: 1,
      updatedAt: 1,
    });
  }
}
