/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { ActivitiesList } from "../components/List/ActivitiesList";
import { ActivitiesCreate } from "../components/Create/ActivitiesCreate";
import { ActivitiesEdit } from "../components/Edit/ActivitiesEdit";
import { ActivitiesView } from "../components/View/ActivitiesView";

import { SettingFilled } from "@ant-design/icons";

export const ACTIVITIES_LIST: IRoute = {
  path: "/admin/activities",
  component: ActivitiesList,
  menu: {
    key: "ACTIVITIES_LIST",
    label: "management.activities.menu.title",
    icon: SettingFilled,
  },
};

export const ACTIVITIES_CREATE: IRoute = {
  path: "/admin/activities/create",
  component: ActivitiesCreate,
};

export const ACTIVITIES_EDIT: IRoute<{ id: string }> = {
  path: "/admin/activities/:id/edit",
  component: ActivitiesEdit,
};

export const ACTIVITIES_VIEW: IRoute<{ id: string }> = {
  path: "/admin/activities/:id/view",
  component: ActivitiesView,
};
