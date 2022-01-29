/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import {
  Activity,
  UsersCollection,
  ActivitiesCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityCreateForm extends XForm {
  @Inject(() => ActivitiesCollection)
  collection: ActivitiesCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.activities.fields.name"),
        name: ["name"],
        required: true,
        component: Ant.Input,
      },
    ]);
  }

  onSubmit(document: Partial<Activity>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activities.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.ACTIVITIES_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.ACTIVITIES_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.ACTIVITIES_EDIT, {
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
