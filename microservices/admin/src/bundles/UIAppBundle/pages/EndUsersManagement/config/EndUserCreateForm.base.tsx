/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import {
  EndUser,
  UsersCollection,
  ActivityLogsCollection,
  EndUsersCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class EndUserCreateForm extends XForm {
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

  onSubmit(document: Partial<EndUser>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.end_users.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.END_USERS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.END_USERS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.END_USERS_EDIT, {
            params: {
              id: _id,
            },
          });
        }
      })
      .catch((err) => {
        Ant.notification.warn({
          message: t("generics.error"),
          description: t("generics.error_message"),
        });
      });
  }
}
