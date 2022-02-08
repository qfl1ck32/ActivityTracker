import { ContainerInstance, Inject, Service } from "@bluelibs/core";
import { ObjectId } from "@bluelibs/ejson";
// TODO :(
import * as crypto from "crypto";
import { pickBy } from "lodash";
import { ActivityNotesService, EndUserService, SecurityService } from ".";
import { Field, NoteModelsCollection } from "../collections";
import { EndUsersNoteModelsCreateInput } from "./inputs/EndUsersNoteModelsCreate.input";
import { EndUsersNoteModelsUpdateInput } from "./inputs/EndUsersNoteModelsUpdate.input";

@Service()
export class NoteModelsService {
  constructor(protected readonly container: ContainerInstance) {}

  @Inject()
  private noteModelsCollection: NoteModelsCollection;

  @Inject(() => EndUserService)
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

    await this.securityService.noteModels.checkFieldsInputIsValid(input);

    await this.securityService.noteModels.checkEndUserDoesNotHaveNoteModelWithTheSameName(
      name,
      endUserId
    );

    const fields = [] as Field[];

    for (const field of inputFields) {
      const { enumValues, ...restOfField } = field;

      fields.push({
        id: crypto.randomUUID(),
        ...restOfField,

        enumValues: enumValues.map((value) => ({
          id: crypto.randomUUID(),
          value,
        })),
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

    const endUserId = await this.endUserService.getIdByOwnerId(userId);

    await this.securityService.noteModels.checkEndUserOwnsNoteModel(
      noteModelId,
      endUserId
    );

    if (fields) {
      await this.securityService.noteModels.checkFieldsInputIsValid(
        { fields: fields as Field[] },
        noteModelId
      );

      for (const field of fields) {
        if (!field.id) {
          field.id = crypto.randomUUID();
        }

        field.enumValues = field.enumValues.map(({ id, value }) => ({
          id: id ?? crypto.randomUUID(),
          value,
        }));
      }
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

    if (fields?.length) {
      await this.activityNotesService.syncWithNewFields(noteModelId);
    }

    return this.noteModelsCollection.findOne({ _id: noteModelId });
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
        id: 1,
        name: 1,
        type: 1,
        enumValues: {
          id: 1,
          value: 1,
        },
      },
      createdAt: 1,
      updatedAt: 1,
    });
  }
}
