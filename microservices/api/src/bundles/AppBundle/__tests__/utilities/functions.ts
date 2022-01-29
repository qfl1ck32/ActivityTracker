import { EndUsersCollection } from "../../collections";
import { EndUserService, NoteModelsService } from "../../services";
import { EndUsersRegisterInput } from "../../services/inputs/EndUsersRegister.input";
import { container } from "../../../../__tests__/ecosystem";
import { endUsersRegisterInput } from "./inputs";
import { EndUsersNoteModelsCreateInput } from "@bundles/AppBundle/services/inputs/EndUsersNoteModelsCreate.input";
import { ObjectId } from "@bluelibs/ejson";

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
