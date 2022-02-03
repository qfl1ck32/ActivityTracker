/** @overridable */
import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use, QueryBodyType } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  NoteModel,
  EndUsersCollection,
  NoteModelsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class NoteModelList extends XList<NoteModel> {
  build() {
    const { UIComponents, router } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        title: t("management.note_models.fields.name"),
        key: "management.note_models.fields.name",
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
        id: "fields",
        title: t("management.note_models.fields.fields"),
        key: "management.note_models.fields.fields",
        dataIndex: ["fields"],
        sorter: true,
        render: (value, model) => {
          return (
            <>
              {value &&
                value.map((value: any, idx: number) => {
                  const props = {
                    type: "object",
                    value,
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
        id: "createdAt",
        title: t("management.note_models.fields.createdAt"),
        key: "management.note_models.fields.createdAt",
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
        title: t("management.note_models.fields.updatedAt"),
        key: "management.note_models.fields.updatedAt",
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
        title: t("management.note_models.fields.endUser"),
        key: "management.note_models.fields.endUser",
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
      endUser: "endUser.fullName",
    };
  }

  static getRequestBody(): QueryBodyType<NoteModel> {
    return {
      _id: 1,
      name: 1,
      fields: {
        id: 1,
        name: 1,
        type: 1,
        enumValues: 1,
      },
      createdAt: 1,
      updatedAt: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
    };
  }
}
