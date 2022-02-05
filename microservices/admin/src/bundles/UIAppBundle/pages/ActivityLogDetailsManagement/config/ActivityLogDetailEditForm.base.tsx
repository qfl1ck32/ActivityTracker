/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
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
export class ActivityLogDetailEditForm extends XForm {
  @Inject(() => ActivityLogDetailsCollection)
  collection: ActivityLogDetailsCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.activity_log_details.fields.name"),
        name: ["name"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "timingId",
        label: t("management.activity_log_details.fields.timing"),
        name: ["timingId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityTimingsCollection}
              field="name"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "noteId",
        label: t("management.activity_log_details.fields.note"),
        name: ["noteId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityNotesCollection}
              field="value"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "activityLogId",
        label: t("management.activity_log_details.fields.activityLog"),
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

      {
        id: "endUserId",
        label: t("management.activity_log_details.fields.endUser"),
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
    ]);
  }

  static getRequestBody(): QueryBodyType<ActivityLogDetail> {
    return {
      _id: 1,
      name: 1,
      timing: {
        _id: 1,
        name: 1,
      },
      timingId: 1,
      note: {
        _id: 1,
        value: 1,
      },
      noteId: 1,
      activityLog: {
        _id: 1,
        name: 1,
      },
      activityLogId: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
    };
  }

  onSubmit(_id, values: Partial<ActivityLogDetail>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_log_details.edit_confirmation"),
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
