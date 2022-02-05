/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

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
export class ActivityLogDetailCreateForm extends XForm {
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
        id: "isFinished",
        label: t("management.activity_log_details.fields.isFinished"),
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

  onSubmit(document: Partial<ActivityLogDetail>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.activity_log_details.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.ACTIVITY_LOG_DETAILS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.ACTIVITY_LOG_DETAILS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.ACTIVITY_LOG_DETAILS_EDIT, {
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
