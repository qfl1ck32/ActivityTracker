/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import {
  ActivityNote,
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
  ActivityNotesCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityNoteCreateForm extends XForm {
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
        id: "activityLogDetailsId",
        label: t("management.activity_notes.fields.activityLogDetails"),
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

  onSubmit(document: Partial<ActivityNote>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_notes.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.ACTIVITY_NOTES_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.ACTIVITY_NOTES_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.ACTIVITY_NOTES_EDIT, {
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
