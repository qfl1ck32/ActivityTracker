import { IRoute } from "@bluelibs/x-ui";
import "./i18n";

import {
  NOTE_MODELS_LIST as BASE_NOTE_MODELS_LIST,
  NOTE_MODELS_CREATE as BASE_NOTE_MODELS_CREATE,
  NOTE_MODELS_EDIT as BASE_NOTE_MODELS_EDIT,
  NOTE_MODELS_VIEW as BASE_NOTE_MODELS_VIEW,
} from "./config/routes";

export const NOTE_MODELS_LIST: IRoute = {
  ...BASE_NOTE_MODELS_LIST,
};

export const NOTE_MODELS_CREATE: IRoute = {
  ...BASE_NOTE_MODELS_CREATE,
};

export const NOTE_MODELS_EDIT: IRoute = {
  ...BASE_NOTE_MODELS_EDIT,
};

export const NOTE_MODELS_VIEW: IRoute = {
  ...BASE_NOTE_MODELS_VIEW,
};
