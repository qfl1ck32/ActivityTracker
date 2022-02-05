import {
  ActivitiesCollection,
  ActivityLogDetailsCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
  EndUsersCollection,
  NoteModelsCollection,
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
import { endUsersRegisterInput } from "./inputs";
import { EndUsersNoteModelsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersNoteModelsCreate.input";
import { ObjectId } from "@bluelibs/ejson";
import { EndUsersActivityLogsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersActivityLogsCreate.input";
import {
  EndUsersActivityLogDetailsCreateInput,
  EndUsersActivityNotesUpdateInput,
} from "@bundles/AppBundle/services/inputs";
import { EndUsersActivityLogDetailsFinishInput } from "@bundles/AppBundle/services/inputs/EndUsersActivityLogDetailsFinish.input";

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

export const getActivityNoteByActivityLogDetailsId = async (
  activityLogDetailsId: ObjectId
) => {
  return container
    .get(ActivityNotesCollection)
    .findOne({ activityLogDetailsId });
};

export const getActivityTimingByActivityLogDetailsId = async (
  activityLogDetailsId: ObjectId
) => {
  return container
    .get(ActivityTimingsCollection)
    .findOne({ activityLogDetailsId });
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

// update

export const updateActivityNote = async (
  input: EndUsersActivityNotesUpdateInput,
  userId: ObjectId
) => container.get(ActivityNotesService).update(input, userId);

export const finishActivity = async (
  input: EndUsersActivityLogDetailsFinishInput,
  userId: ObjectId
) => container.get(ActivityLogDetailsService).finish(input, userId);
