import { User } from "@bundles/AppBundle/collections";
import { EndUsersRegisterInput } from "../../services/inputs/EndUsersRegister.input";

export const endUsersRegisterInput = {
  firstName: "End User",
  lastName: "End User",
  email: "enduser@app.com",
  password: "test",
} as EndUsersRegisterInput;

export const userInput = {
  profile: {
    firstName: "firstName",
    lastName: "lastName",
  },

  password: {
    email: "user@app.com",
  },
} as Partial<User>;
