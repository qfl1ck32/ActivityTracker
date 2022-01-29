/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { ActivityLogDetailsList } from "../components/List/ActivityLogDetailsList";
import { ActivityLogDetailsCreate } from "../components/Create/ActivityLogDetailsCreate";
import { ActivityLogDetailsEdit } from "../components/Edit/ActivityLogDetailsEdit";
import { ActivityLogDetailsView } from "../components/View/ActivityLogDetailsView";

import { SettingFilled } from "@ant-design/icons";

export const ACTIVITY_LOG_DETAILS_LIST: IRoute = {
  path: "/admin/activity-log-details",
  component: ActivityLogDetailsList,
  menu: {
    key: "ACTIVITY_LOG_DETAILS_LIST",
    label: "management.activity_log_details.menu.title",
    icon: SettingFilled,
  },
};

export const ACTIVITY_LOG_DETAILS_CREATE: IRoute = {
  path: "/admin/activity-log-details/create",
  component: ActivityLogDetailsCreate,
};

export const ACTIVITY_LOG_DETAILS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/activity-log-details/:id/edit",
  component: ActivityLogDetailsEdit,
};

export const ACTIVITY_LOG_DETAILS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/activity-log-details/:id/view",
  component: ActivityLogDetailsView,
};
