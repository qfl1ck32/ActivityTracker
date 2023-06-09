import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  ACTIVITY_TIMINGS_LIST as BASE_ACTIVITY_TIMINGS_LIST,
  ACTIVITY_TIMINGS_CREATE as BASE_ACTIVITY_TIMINGS_CREATE,
  ACTIVITY_TIMINGS_EDIT as BASE_ACTIVITY_TIMINGS_EDIT,
  ACTIVITY_TIMINGS_VIEW as BASE_ACTIVITY_TIMINGS_VIEW,
} from "./config/routes";

export const ACTIVITY_TIMINGS_LIST: IRoute = {
  ...BASE_ACTIVITY_TIMINGS_LIST,
};

export const ACTIVITY_TIMINGS_CREATE: IRoute = {
  ...BASE_ACTIVITY_TIMINGS_CREATE,
};

export const ACTIVITY_TIMINGS_EDIT: IRoute = {
  ...BASE_ACTIVITY_TIMINGS_EDIT,
};

export const ACTIVITY_TIMINGS_VIEW: IRoute = {
  ...BASE_ACTIVITY_TIMINGS_VIEW,
};
