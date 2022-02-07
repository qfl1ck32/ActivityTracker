/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  ActivityNote,
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
  ActivityNotesCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityNoteEditForm extends XForm {
  @Inject(() => ActivityNotesCollection)
  collection: ActivityNotesCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "value",
        label: t("management.activity_notes.fields.value"),
        name: ["value"],
        required: true,
        tooltip: t("management.activity_notes.fields.value_description"),
        initialValue: "{}",
        component: Ant.Input,
      },

      {
        id: "endUserId",
        label: t("management.activity_notes.fields.endUser"),
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
        id: "activityLogDetailId",
        label: t("management.activity_notes.fields.activityLogDetail"),
        name: ["activityLogDetailId"],
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

  static getRequestBody(): QueryBodyType<ActivityNote> {
    return {
      _id: 1,
      value: 1,
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
      activityLogDetail: {
        _id: 1,
      },
      activityLogDetailId: 1,
    };
  }

  onSubmit(_id, values: Partial<ActivityNote>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_notes.edit_confirmation"),
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
