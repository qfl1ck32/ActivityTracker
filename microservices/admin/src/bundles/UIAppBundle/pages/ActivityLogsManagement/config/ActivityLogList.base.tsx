/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ActivityLog,
  ActivitiesCollection,
  NoteModelsCollection,
  ActivityLogDetailsCollection,
  EndUsersCollection,
  UsersCollection,
  ActivityLogsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityLogList extends XList<ActivityLog> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        title: t("management.activity_logs.fields.name"),
        key: "management.activity_logs.fields.name",
        dataIndex: ["name"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "string",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "isFinished",
        title: t("management.activity_logs.fields.isFinished"),
        key: "management.activity_logs.fields.isFinished",
        dataIndex: ["isFinished"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "boolean",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "createdAt",
        title: t("management.activity_logs.fields.createdAt"),
        key: "management.activity_logs.fields.createdAt",
        dataIndex: ["createdAt"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "date",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "updatedAt",
        title: t("management.activity_logs.fields.updatedAt"),
        key: "management.activity_logs.fields.updatedAt",
        dataIndex: ["updatedAt"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "date",
            value,
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "activity",
        title: t("management.activity_logs.fields.activity"),
        key: "management.activity_logs.fields.activity",
        dataIndex: ["activity"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.ACTIVITIES_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "name",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "noteModel",
        title: t("management.activity_logs.fields.noteModel"),
        key: "management.activity_logs.fields.noteModel",
        dataIndex: ["noteModel"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.NOTE_MODELS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "name",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "details",
        title: t("management.activity_logs.fields.details"),
        key: "management.activity_logs.fields.details",
        dataIndex: ["details"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.ACTIVITY_LOG_DETAILS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "name",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "endUser",
        title: t("management.activity_logs.fields.endUser"),
        key: "management.activity_logs.fields.endUser",
        dataIndex: ["endUser"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.END_USERS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "fullName",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "createdBy",
        title: t("management.activity_logs.fields.createdBy"),
        key: "management.activity_logs.fields.createdBy",
        dataIndex: ["createdBy"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.USERS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "fullName",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "updatedBy",
        title: t("management.activity_logs.fields.updatedBy"),
        key: "management.activity_logs.fields.updatedBy",
        dataIndex: ["updatedBy"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.USERS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "fullName",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
    ]);
  }

  static getSortMap() {
    return {
      activity: "activity.name",
      noteModel: "noteModel.name",
      details: "details.name",
      endUser: "endUser.fullName",
      createdBy: "createdBy.fullName",
      updatedBy: "updatedBy.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<ActivityLog> {
    return {
      _id: 1,
      name: 1,
      isFinished: 1,
      createdAt: 1,
      updatedAt: 1,
      activity: {
        _id: 1,
        name: 1,
      },
      activityId: 1,
      noteModel: {
        _id: 1,
        name: 1,
      },
      noteModelId: 1,
      details: {
        _id: 1,
        name: 1,
      },
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
      createdBy: {
        _id: 1,
        fullName: 1,
      },
      createdById: 1,
      updatedBy: {
        _id: 1,
        fullName: 1,
      },
      updatedById: 1,
    };
  }
}
