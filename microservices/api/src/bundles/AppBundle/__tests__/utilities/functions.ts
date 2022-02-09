import {
  ActivitiesCollection,
  ActivityLogDetailsCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
  EndUsersCollection,
  NoteModelsCollection,
  User,
  UsersCollection,
} from "../../collections";
import {
  ActivityLogDetailsService,
  ActivityLogsService,
  ActivityNotesService,
  EndUserService,
  NoteModelsService,
} from "../../services";
import { EndUsersRegisterInput } from "../../services/inputs/EndUsersRegister.input";
import { container } from "../../../../__tests__/ecosystem";
import { endUsersRegisterInput, userInput } from "./inputs";
import { EndUsersNoteModelsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersNoteModelsCreate.input";
import { ObjectId } from "@bluelibs/ejson";
import { EndUsersActivityLogsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersActivityLogsCreate.input";
import {
  EndUsersActivityLogDetailsCreateInput,
  EndUsersActivityNotesUpdateInput,
} from "@bundles/AppBundle/services/inputs";
import { EndUsersActivityLogDetailsFinishInput } from "@bundles/AppBundle/services/inputs/EndUsersActivityLogDetailsFinish.input";
import { DeepPartial } from "@bluelibs/core";

// create
export const createEndUser = async (
  input: EndUsersRegisterInput = endUsersRegisterInput
) => {
  await container.get(EndUserService).register(input);

  const endUser = await container.get(EndUsersCollection).findOne({
    email: input.email,
  });

  return {
    endUserId: endUser._id,
    userId: endUser.ownerId,
  };
};

export const createUser = async (input: DeepPartial<User> = userInput) => {
  const usersCollection = container.get(UsersCollection);

  return (await usersCollection.insertOne(input as any)).insertedId;
};

export const createNoteModel = async (
  input: EndUsersNoteModelsCreateInput,
  userId: ObjectId
) => {
  return (await container.get(NoteModelsService).create(input, userId))._id;
};

export const createActivity = async (name: string = "activity") => {
  const activitiesCollection = container.get(ActivitiesCollection);

  const { insertedId } = await activitiesCollection.insertOne({
    name,
  });

  return insertedId;
};

export const createActivityLog = async (
  input: EndUsersActivityLogsCreateInput,
  userId: ObjectId
) => {
  return (await container.get(ActivityLogsService).create(input, userId))._id;
};

export const createActivityLogDetails = async (
  input: EndUsersActivityLogDetailsCreateInput,
  userId: ObjectId
) => {
  return (await container.get(ActivityLogDetailsService).create(input, userId))
    ._id;
};

// get

export const getActivityNoteByActivityLogDetailId = async (
  activityLogDetailId: ObjectId
) => {
  return container
    .get(ActivityNotesCollection)
    .findOne({ activityLogDetailId });
};

export const getActivityTimingByActivityLogDetailId = async (
  activityLogDetailId: ObjectId
) => {
  return container
    .get(ActivityTimingsCollection)
    .findOne({ activityLogDetailId });
};

export const getNoteModelById = async (noteModelId: ObjectId) =>
  container.get(NoteModelsCollection).findOne({ _id: noteModelId });

export const getActivityLogDetail = async (activityLogDetailId: ObjectId) =>
  container.get(ActivityLogDetailsCollection).queryOne({
    $: {
      filters: {
        _id: activityLogDetailId,
      },
    },

    timing: {
      finishedAt: 1,

      isFinished: 1,
    },
  });

export const getUser = async (userId: ObjectId) =>
  container.get(UsersCollection).findOne({
    _id: userId,
  });

export const getEndUser = async (endUserId: ObjectId) =>
  container.get(EndUsersCollection).findOne({ _id: endUserId });

// update

export const updateActivityNote = async (
  input: EndUsersActivityNotesUpdateInput,
  userId: ObjectId
) => container.get(ActivityNotesService).update(input, userId);

export const finishActivity = async (
  input: EndUsersActivityLogDetailsFinishInput,
  userId: ObjectId
) => container.get(ActivityLogDetailsService).finish(input, userId);
