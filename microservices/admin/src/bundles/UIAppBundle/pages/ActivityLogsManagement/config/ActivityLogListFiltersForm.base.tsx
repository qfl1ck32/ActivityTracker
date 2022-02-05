/** @overridable */
import { notification } from "antd";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use } from "@bluelibs/x-ui";
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
export class ActivityLogListFiltersForm extends XForm {
  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.activity_logs.fields.name"),
        name: ["name"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Input />
          </Ant.Form.Item>
        ),
      },

      {
        id: "isFinished",
        label: t("management.activity_logs.fields.isFinished"),
        name: ["isFinished"],
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
        id: "createdAt",
        label: t("management.activity_logs.fields.createdAt"),
        name: ["createdAt"],
        tooltip: t("management.activity_logs.fields.createdAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "updatedAt",
        label: t("management.activity_logs.fields.updatedAt"),
        name: ["updatedAt"],
        tooltip: t("management.activity_logs.fields.updatedAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "activityId",
        label: t("management.activity_logs.fields.activity"),
        name: ["activityId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivitiesCollection}
              field="name"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "noteModelId",
        label: t("management.activity_logs.fields.noteModel"),
        name: ["noteModelId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={NoteModelsCollection}
              field="name"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "endUserId",
        label: t("management.activity_logs.fields.endUser"),
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

      {
        id: "createdById",
        label: t("management.activity_logs.fields.createdBy"),
        name: ["createdById"],
        tooltip: t("management.activity_logs.fields.createdBy_description"),
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
        label: t("management.activity_logs.fields.updatedBy"),
        name: ["updatedById"],
        tooltip: t("management.activity_logs.fields.updatedBy_description"),
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
    ]);
  }
}
