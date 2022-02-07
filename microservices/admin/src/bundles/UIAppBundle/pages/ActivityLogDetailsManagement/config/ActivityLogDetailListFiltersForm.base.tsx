/** @overridable */
import { notification } from "antd";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use } from "@bluelibs/x-ui";
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
export class ActivityLogDetailListFiltersForm extends XForm {
  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "createdAt",
        label: t("management.activity_log_details.fields.createdAt"),
        name: ["createdAt"],
        tooltip: t(
          "management.activity_log_details.fields.createdAt_description"
        ),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "updatedAt",
        label: t("management.activity_log_details.fields.updatedAt"),
        name: ["updatedAt"],
        tooltip: t(
          "management.activity_log_details.fields.updatedAt_description"
        ),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "createdById",
        label: t("management.activity_log_details.fields.createdBy"),
        name: ["createdById"],
        tooltip: t(
          "management.activity_log_details.fields.createdBy_description"
        ),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={UsersCollection}
              field="fullName"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "updatedById",
        label: t("management.activity_log_details.fields.updatedBy"),
        name: ["updatedById"],
        tooltip: t(
          "management.activity_log_details.fields.updatedBy_description"
        ),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={UsersCollection}
              field="fullName"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "timingId",
        label: t("management.activity_log_details.fields.timing"),
        name: ["timingId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityTimingsCollection}
              field="_id"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "noteId",
        label: t("management.activity_log_details.fields.note"),
        name: ["noteId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityNotesCollection}
              field="value"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "activityLogId",
        label: t("management.activity_log_details.fields.activityLog"),
        name: ["activityLogId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityLogsCollection}
              field="_id"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "endUserId",
        label: t("management.activity_log_details.fields.endUser"),
        name: ["endUserId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={EndUsersCollection}
              field="fullName"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },
    ]);
  }
}
