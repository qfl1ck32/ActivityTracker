/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  EndUser,
  UsersCollection,
  ActivityLogsCollection,
  EndUsersCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class EndUserList extends XList<EndUser> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "firstName",
        title: t("management.end_users.fields.firstName"),
        key: "management.end_users.fields.firstName",
        dataIndex: ["firstName"],
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
        id: "lastName",
        title: t("management.end_users.fields.lastName"),
        key: "management.end_users.fields.lastName",
        dataIndex: ["lastName"],
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
        id: "email",
        title: t("management.end_users.fields.email"),
        key: "management.end_users.fields.email",
        dataIndex: ["email"],
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
        id: "fullName",
        title: t("management.end_users.fields.fullName"),
        key: "management.end_users.fields.fullName",
        dataIndex: ["fullName"],
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
        title: t("management.end_users.fields.createdAt"),
        key: "management.end_users.fields.createdAt",
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
        title: t("management.end_users.fields.updatedAt"),
        key: "management.end_users.fields.updatedAt",
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
        id: "owner",
        title: t("management.end_users.fields.owner"),
        key: "management.end_users.fields.owner",
        dataIndex: ["owner"],
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
        id: "activityLogs",
        title: t("management.end_users.fields.activityLogs"),
        key: "management.end_users.fields.activityLogs",
        dataIndex: ["activityLogs"],
        sorter: true,
        render: (value, model) => {
          return (
            <>
              {value &&
                value.map((value: any, idx: number) => {
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
                  return (
                    <UIComponents.AdminListItemRenderer {...props} key={idx} />
                  );
                })}
            </>
          );
        },
      },
      {
        id: "createdBy",
        title: t("management.end_users.fields.createdBy"),
        key: "management.end_users.fields.createdBy",
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
        title: t("management.end_users.fields.updatedBy"),
        key: "management.end_users.fields.updatedBy",
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
      owner: "owner.fullName",
      activityLogs: "activityLogs._id",
      createdBy: "createdBy.fullName",
      updatedBy: "updatedBy.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<EndUser> {
    return {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      fullName: 1,
      createdAt: 1,
      updatedAt: 1,
      owner: {
        _id: 1,
        fullName: 1,
      },
      ownerId: 1,
      activityLogs: {
        _id: 1,
      },
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
