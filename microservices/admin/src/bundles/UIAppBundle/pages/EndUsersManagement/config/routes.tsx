/** @overridable */
import { IRoute } from "@bluelibs/x-ui";
import * as React from "react";
import { EndUsersList } from "../components/List/EndUsersList";
import { EndUsersCreate } from "../components/Create/EndUsersCreate";
import { EndUsersEdit } from "../components/Edit/EndUsersEdit";
import { EndUsersView } from "../components/View/EndUsersView";

import { SettingFilled } from "@ant-design/icons";

export const END_USERS_LIST: IRoute = {
  path: "/admin/end-users",
  component: EndUsersList,
  menu: {
    key: "END_USERS_LIST",
    label: "management.end_users.menu.title",
    icon: SettingFilled,
  },
};

export const END_USERS_CREATE: IRoute = {
  path: "/admin/end-users/create",
  component: EndUsersCreate,
};

export const END_USERS_EDIT: IRoute<{ id: string }> = {
  path: "/admin/end-users/:id/edit",
  component: EndUsersEdit,
};

export const END_USERS_VIEW: IRoute<{ id: string }> = {
  path: "/admin/end-users/:id/view",
  component: EndUsersView,
};
