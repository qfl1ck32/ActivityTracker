/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import {
  ActivityTiming,
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
  ActivityTimingsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityTimingCreateForm extends XForm {
  @Inject(() => ActivityTimingsCollection)
  collection: ActivityTimingsCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "startedAt",
        label: t("management.activity_timings.fields.startedAt"),
        name: ["startedAt"],
        required: true,
        component: UIComponents.DatePicker,
      },

      {
        id: "finishedAt",
        label: t("management.activity_timings.fields.finishedAt"),
        name: ["finishedAt"],
        component: UIComponents.DatePicker,
      },

      {
        id: "endUserId",
        label: t("management.activity_timings.fields.endUser"),
        name: ["endUserId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={EndUsersCollection}
              field="fullName"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "activityLogDetailsId",
        label: t("management.activity_timings.fields.activityLogDetails"),
        name: ["activityLogDetailsId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityLogDetailsCollection}
              field="_id"
            />
          </Ant.Form.Item>
        ),
      },
    ]);
  }

  onSubmit(document: Partial<ActivityTiming>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_timings.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.ACTIVITY_TIMINGS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.ACTIVITY_TIMINGS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.ACTIVITY_TIMINGS_EDIT, {
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
