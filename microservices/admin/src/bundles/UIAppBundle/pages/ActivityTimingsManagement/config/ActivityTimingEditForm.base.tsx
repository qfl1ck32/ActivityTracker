/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  ActivityTiming,
  EndUsersCollection,
  ActivityLogsCollection,
  UsersCollection,
  ActivityTimingsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityTimingEditForm extends XForm {
  @Inject(() => ActivityTimingsCollection)
  collection: ActivityTimingsCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.activity_timings.fields.name"),
        name: ["name"],
        required: true,
        component: Ant.Input,
      },

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
        id: "activityLogId",
        label: t("management.activity_timings.fields.activityLog"),
        name: ["activityLogId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityLogsCollection}
              field="name"
            />
          </Ant.Form.Item>
        ),
      },
    ]);
  }

  static getRequestBody(): QueryBodyType<ActivityTiming> {
    return {
      _id: 1,
      name: 1,
      startedAt: 1,
      finishedAt: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
      activityLog: {
        _id: 1,
        name: 1,
      },
      activityLogId: 1,
    };
  }

  onSubmit(_id, values: Partial<ActivityTiming>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_timings.edit_confirmation"),
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
