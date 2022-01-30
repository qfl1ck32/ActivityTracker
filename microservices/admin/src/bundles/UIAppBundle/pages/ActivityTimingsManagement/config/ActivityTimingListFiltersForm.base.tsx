/** @overridable */
import { notification } from "antd";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  ActivityTiming,
  EndUsersCollection,
  ActivityLogDetailsCollection,
  UsersCollection,
  ActivityTimingsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class ActivityTimingListFiltersForm extends XForm {
  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.activity_timings.fields.name"),
        name: ["name"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Input />
          </Ant.Form.Item>
        ),
      },

      {
        id: "startedAt",
        label: t("management.activity_timings.fields.startedAt"),
        name: ["startedAt"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "finishedAt",
        label: t("management.activity_timings.fields.finishedAt"),
        name: ["finishedAt"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "createdAt",
        label: t("management.activity_timings.fields.createdAt"),
        name: ["createdAt"],
        tooltip: t("management.activity_timings.fields.createdAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "updatedAt",
        label: t("management.activity_timings.fields.updatedAt"),
        name: ["updatedAt"],
        tooltip: t("management.activity_timings.fields.updatedAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "endUserId",
        label: t("management.activity_timings.fields.endUser"),
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
        label: t("management.activity_timings.fields.activityLogDetails"),
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
        label: t("management.activity_timings.fields.createdBy"),
        name: ["createdById"],
        tooltip: t("management.activity_timings.fields.createdBy_description"),
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
        label: t("management.activity_timings.fields.updatedBy"),
        name: ["updatedById"],
        tooltip: t("management.activity_timings.fields.updatedBy_description"),
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
