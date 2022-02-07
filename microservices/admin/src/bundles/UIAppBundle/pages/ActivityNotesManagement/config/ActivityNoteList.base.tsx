/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ActivityNote,
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
  ActivityNotesCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityNoteList extends XList<ActivityNote> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "value",
        title: t("management.activity_notes.fields.value"),
        key: "management.activity_notes.fields.value",
        dataIndex: ["value"],
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
        id: "createdAt",
        title: t("management.activity_notes.fields.createdAt"),
        key: "management.activity_notes.fields.createdAt",
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
        title: t("management.activity_notes.fields.updatedAt"),
        key: "management.activity_notes.fields.updatedAt",
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
        id: "endUser",
        title: t("management.activity_notes.fields.endUser"),
        key: "management.activity_notes.fields.endUser",
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
        id: "activityLogDetail",
        title: t("management.activity_notes.fields.activityLogDetail"),
        key: "management.activity_notes.fields.activityLogDetail",
        dataIndex: ["activityLogDetail"],
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
              dataIndex: "_id",
            },
          };
          return <UIComponents.AdminListItemRenderer {...props} />;
        },
      },
      {
        id: "createdBy",
        title: t("management.activity_notes.fields.createdBy"),
        key: "management.activity_notes.fields.createdBy",
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
        title: t("management.activity_notes.fields.updatedBy"),
        key: "management.activity_notes.fields.updatedBy",
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
      endUser: "endUser.fullName",
      activityLogDetail: "activityLogDetail._id",
      createdBy: "createdBy.fullName",
      updatedBy: "updatedBy.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<ActivityNote> {
    return {
      _id: 1,
      value: 1,
      createdAt: 1,
      updatedAt: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
      activityLogDetail: {
        _id: 1,
      },
      activityLogDetailId: 1,
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
