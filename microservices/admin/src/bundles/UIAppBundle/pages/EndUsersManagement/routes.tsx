import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  END_USERS_LIST as BASE_END_USERS_LIST,
  END_USERS_CREATE as BASE_END_USERS_CREATE,
  END_USERS_EDIT as BASE_END_USERS_EDIT,
  END_USERS_VIEW as BASE_END_USERS_VIEW,
} from "./config/routes";

export const END_USERS_LIST: IRoute = {
  ...BASE_END_USERS_LIST,
};

export const END_USERS_CREATE: IRoute = {
  ...BASE_END_USERS_CREATE,
};

export const END_USERS_EDIT: IRoute = {
  ...BASE_END_USERS_EDIT,
};

export const END_USERS_VIEW: IRoute = {
  ...BASE_END_USERS_VIEW,
};
