import {
  ActivitiesCollection,
  ActivityNotesCollection,
  ActivityTimingsCollection,
  EndUsersCollection,
  NoteModelsCollection,
} from "../../collections";
import {
  ActivityLogDetailsService,
  ActivityLogsService,
  EndUserService,
  NoteModelsService,
} from "../../services";
import { EndUsersRegisterInput } from "../../services/inputs/EndUsersRegister.input";
import { container } from "../../../../__tests__/ecosystem";
import { endUsersRegisterInput } from "./inputs";
import { EndUsersNoteModelsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersNoteModelsCreate.input";
import { ObjectId } from "@bluelibs/ejson";
import { EndUsersActivityLogsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersActivityLogsCreate.input";
import { EndUsersActivityLogDetailsCreateInput } from "@bundles/AppBundle/services/inputs";

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
