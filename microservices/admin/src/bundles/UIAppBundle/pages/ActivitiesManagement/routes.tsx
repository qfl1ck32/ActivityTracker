import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  ACTIVITIES_LIST as BASE_ACTIVITIES_LIST,
  ACTIVITIES_CREATE as BASE_ACTIVITIES_CREATE,
  ACTIVITIES_EDIT as BASE_ACTIVITIES_EDIT,
  ACTIVITIES_VIEW as BASE_ACTIVITIES_VIEW,
} from "./config/routes";

export const ACTIVITIES_LIST: IRoute = {
  ...BASE_ACTIVITIES_LIST,
};

export const ACTIVITIES_CREATE: IRoute = {
  ...BASE_ACTIVITIES_CREATE,
};

export const ACTIVITIES_EDIT: IRoute = {
  ...BASE_ACTIVITIES_EDIT,
};

export const ACTIVITIES_VIEW: IRoute = {
  ...BASE_ACTIVITIES_VIEW,
};
