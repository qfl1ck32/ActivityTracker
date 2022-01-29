/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { ActivityNotesList } from "../components/List/ActivityNotesList";
import { ActivityNotesCreate } from "../components/Create/ActivityNotesCreate";
import { ActivityNotesEdit } from "../components/Edit/ActivityNotesEdit";
import { ActivityNotesView } from "../components/View/ActivityNotesView";

import { SettingFilled } from "@ant-design/icons";

export const ACTIVITY_NOTES_LIST: IRoute = {
  path: "/admin/activity-notes",
  component: ActivityNotesList,
  menu: {
    key: "ACTIVITY_NOTES_LIST",
    label: "management.activity_notes.menu.title",
    icon: SettingFilled,
  },
};

export const ACTIVITY_NOTES_CREATE: IRoute = {
  path: "/admin/activity-notes/create",
  component: ActivityNotesCreate,
};

export const ACTIVITY_NOTES_EDIT: IRoute<{ id: string }> = {
  path: "/admin/activity-notes/:id/edit",
  component: ActivityNotesEdit,
};

export const ACTIVITY_NOTES_VIEW: IRoute<{ id: string }> = {
  path: "/admin/activity-notes/:id/view",
  component: ActivityNotesView,
};
