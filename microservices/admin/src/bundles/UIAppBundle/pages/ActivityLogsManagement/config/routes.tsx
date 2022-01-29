/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { ActivityLogsList } from "../components/List/ActivityLogsList";
import { ActivityLogsCreate } from "../components/Create/ActivityLogsCreate";
import { ActivityLogsEdit } from "../components/Edit/ActivityLogsEdit";
import { ActivityLogsView } from "../components/View/ActivityLogsView";

import { SettingFilled } from "@ant-design/icons";

export const ACTIVITY_LOGS_LIST: IRoute = {
  path: "/admin/activity-logs",
  component: ActivityLogsList,
  menu: {
    key: "ACTIVITY_LOGS_LIST",
    label: "management.activity_logs.menu.title",
    icon: SettingFilled,
  },
};

export const ACTIVITY_LOGS_CREATE: IRoute = {
  path: "/admin/activity-logs/create",
  component: ActivityLogsCreate,
};

export const ACTIVITY_LOGS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/activity-logs/:id/edit",
  component: ActivityLogsEdit,
};

export const ACTIVITY_LOGS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/activity-logs/:id/view",
  component: ActivityLogsView,
};
