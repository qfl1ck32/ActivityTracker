/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { ActivityTimingsList } from "../components/List/ActivityTimingsList";
import { ActivityTimingsCreate } from "../components/Create/ActivityTimingsCreate";
import { ActivityTimingsEdit } from "../components/Edit/ActivityTimingsEdit";
import { ActivityTimingsView } from "../components/View/ActivityTimingsView";

import { SettingFilled } from "@ant-design/icons";

export const ACTIVITY_TIMINGS_LIST: IRoute = {
  path: "/admin/activity-timings",
  component: ActivityTimingsList,
  menu: {
    key: "ACTIVITY_TIMINGS_LIST",
    label: "management.activity_timings.menu.title",
    icon: SettingFilled,
  },
};

export const ACTIVITY_TIMINGS_CREATE: IRoute = {
  path: "/admin/activity-timings/create",
  component: ActivityTimingsCreate,
};

export const ACTIVITY_TIMINGS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/activity-timings/:id/edit",
  component: ActivityTimingsEdit,
};

export const ACTIVITY_TIMINGS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/activity-timings/:id/view",
  component: ActivityTimingsView,
};
