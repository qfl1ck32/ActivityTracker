/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ActivityLogDetail,
  UsersCollection,
  ActivityTimingsCollection,
  ActivityNotesCollection,
  ActivityLogsCollection,
  EndUsersCollection,
  ActivityLogDetailsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityLogDetailList extends XList<ActivityLogDetail> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "createdAt",
        title: t("management.activity_log_details.fields.createdAt"),
        key: "management.activity_log_details.fields.createdAt",
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
        title: t("management.activity_log_details.fields.updatedAt"),
        key: "management.activity_log_details.fields.updatedAt",
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
        id: "createdBy",
        title: t("management.activity_log_details.fields.createdBy"),
        key: "management.activity_log_details.fields.createdBy",
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
        title: t("management.activity_log_details.fields.updatedBy"),
        key: "management.activity_log_details.fields.updatedBy",
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
      {
        id: "timing",
        title: t("management.activity_log_details.fields.timing"),
        key: "management.activity_log_details.fields.timing",
        dataIndex: ["timing"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.ACTIVITY_TIMINGS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "_id",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "note",
        title: t("management.activity_log_details.fields.note"),
        key: "management.activity_log_details.fields.note",
        dataIndex: ["note"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.ACTIVITY_NOTES_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "value",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "activityLog",
        title: t("management.activity_log_details.fields.activityLog"),
        key: "management.activity_log_details.fields.activityLog",
        dataIndex: ["activityLog"],
        sorter: true,
        render: (value, model) => {
          const props = {
            type: "relation",
            value,
            relation: {
              path: router.path(Routes.ACTIVITY_LOGS_VIEW, {
                params: {
                  id: value?._id,
                },
              }),
              dataIndex: "_id",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "endUser",
        title: t("management.activity_log_details.fields.endUser"),
        key: "management.activity_log_details.fields.endUser",
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
    ]);
  }

  static getSortMap() {
    return {
      createdBy: "createdBy.fullName",
      updatedBy: "updatedBy.fullName",
      timing: "timing._id",
      note: "note.value",
      activityLog: "activityLog._id",
      endUser: "endUser.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<ActivityLogDetail> {
    return {
      _id: 1,
      createdAt: 1,
      updatedAt: 1,
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
      timing: {
        _id: 1,
      },
      timingId: 1,
      note: {
        _id: 1,
        value: 1,
      },
      noteId: 1,
      activityLog: {
        _id: 1,
      },
      activityLogId: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
    };
  }
}
