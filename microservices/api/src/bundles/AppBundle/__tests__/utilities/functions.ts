import { ActivitiesCollection, EndUsersCollection } from "../../collections";
import {
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
  const noteModelsService = container.get(NoteModelsService);

  return noteModelsService.create(input, userId);
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
  const activityLogsService = container.get(ActivityLogsService);

  return activityLogsService.create(input, userId);
};