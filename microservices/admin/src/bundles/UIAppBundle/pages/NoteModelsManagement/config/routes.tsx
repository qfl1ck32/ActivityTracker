/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { NoteModelsList } from "../components/List/NoteModelsList";
import { NoteModelsCreate } from "../components/Create/NoteModelsCreate";
import { NoteModelsEdit } from "../components/Edit/NoteModelsEdit";
import { NoteModelsView } from "../components/View/NoteModelsView";

import { SettingFilled } from "@ant-design/icons";

export const NOTE_MODELS_LIST: IRoute = {
  path: "/admin/note-models",
  component: NoteModelsList,
  menu: {
    key: "NOTE_MODELS_LIST",
    label: "management.note_models.menu.title",
    icon: SettingFilled,
  },
};

export const NOTE_MODELS_CREATE: IRoute = {
  path: "/admin/note-models/create",
  component: NoteModelsCreate,
};

export const NOTE_MODELS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/note-models/:id/edit",
  component: NoteModelsEdit,
};

export const NOTE_MODELS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/note-models/:id/view",
  component: NoteModelsView,
};
