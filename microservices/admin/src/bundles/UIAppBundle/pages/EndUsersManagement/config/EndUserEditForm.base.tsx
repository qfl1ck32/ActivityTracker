/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  EndUser,
  UsersCollection,
  ActivityLogsCollection,
  EndUsersCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class EndUserEditForm extends XForm {
  @Inject(() => EndUsersCollection)
  collection: EndUsersCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "firstName",
        label: t("management.end_users.fields.firstName"),
        name: ["firstName"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "lastName",
        label: t("management.end_users.fields.lastName"),
        name: ["lastName"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "email",
        label: t("management.end_users.fields.email"),
        name: ["email"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "ownerId",
        label: t("management.end_users.fields.owner"),
        name: ["ownerId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={UsersCollection}
              field="fullName"
            />
          </Ant.Form.Item>
        ),
      },
    ]);
  }

  static getRequestBody(): QueryBodyType<EndUser> {
    return {
      _id: 1,
      firstName: 1,
      lastName: 1,
      email: 1,
      owner: {
        _id: 1,
        fullName: 1,
      },
      ownerId: 1,
    };
  }

  onSubmit(_id, values: Partial<EndUser>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.end_users.edit_confirmation"),
          icon: <SmileOutlined />,
        });
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
