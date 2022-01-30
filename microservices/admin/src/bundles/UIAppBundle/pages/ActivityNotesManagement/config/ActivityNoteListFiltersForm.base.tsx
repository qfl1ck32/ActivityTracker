/** @overridable */
import { notification } from "antd";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ActivityNote,
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
  ActivityNotesCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityNoteListFiltersForm extends XForm {
  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "value",
        label: t("management.activity_notes.fields.value"),
        name: ["value"],
        tooltip: t("management.activity_notes.fields.value_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Input />
          </Ant.Form.Item>
        ),
      },

      {
        id: "createdAt",
        label: t("management.activity_notes.fields.createdAt"),
        name: ["createdAt"],
        tooltip: t("management.activity_notes.fields.createdAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "updatedAt",
        label: t("management.activity_notes.fields.updatedAt"),
        name: ["updatedAt"],
        tooltip: t("management.activity_notes.fields.updatedAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "endUserId",
        label: t("management.activity_notes.fields.endUser"),
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
        id: "activityLogDetailsId",
        label: t("management.activity_notes.fields.activityLogDetails"),
        name: ["activityLogDetailsId"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <UIComponents.RemoteSelect
              collectionClass={ActivityLogDetailsCollection}
              field="name"
              placeholder="Please select an option"
              mode="multiple"
            />
          </Ant.Form.Item>
        ),
      },

      {
        id: "createdById",
        label: t("management.activity_notes.fields.createdBy"),
        name: ["createdById"],
        tooltip: t("management.activity_notes.fields.createdBy_description"),
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
        label: t("management.activity_notes.fields.updatedBy"),
        name: ["updatedById"],
        tooltip: t("management.activity_notes.fields.updatedBy_description"),
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
