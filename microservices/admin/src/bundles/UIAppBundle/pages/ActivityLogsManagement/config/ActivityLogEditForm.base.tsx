/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  ActivityLog,
  ActivitiesCollection,
  NoteModelsCollection,
  ActivityLogDetailsCollection,
  EndUsersCollection,
  UsersCollection,
  ActivityLogsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityLogEditForm extends XForm {
  @Inject(() => ActivityLogsCollection)
  collection: ActivityLogsCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.activity_logs.fields.name"),
        name: ["name"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "isFinished",
        label: t("management.activity_logs.fields.isFinished"),
        name: ["isFinished"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Radio.Group>
              <Ant.Radio value={false} key={0}>
                No
              </Ant.Radio>
              <Ant.Radio value={true} key={1}>
                Yes
              </Ant.Radio>
            </Ant.Radio.Group>
          </Ant.Form.Item>
        ),
      },

      {
        id: "activityId",
        label: t("management.activity_logs.fields.activity"),
        name: ["activityId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivitiesCollection}
              field="name"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "noteModelId",
        label: t("management.activity_logs.fields.noteModel"),
        name: ["noteModelId"],
        required: true,
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={NoteModelsCollection}
              field="name"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "endUserId",
        label: t("management.activity_logs.fields.endUser"),
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

  static getRequestBody(): QueryBodyType<ActivityLog> {
    return {
      _id: 1,
      name: 1,
      isFinished: 1,
      activity: {
        _id: 1,
        name: 1,
      },
      activityId: 1,
      noteModel: {
        _id: 1,
        name: 1,
      },
      noteModelId: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
    };
  }

  onSubmit(_id, values: Partial<ActivityLog>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_logs.edit_confirmation"),
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
