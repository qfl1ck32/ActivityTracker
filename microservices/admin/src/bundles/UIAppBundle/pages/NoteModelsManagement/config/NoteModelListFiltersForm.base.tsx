/** @overridable */
import { notification } from "antd";
import { XFormElementType, XList, XForm } from "@bluelibs/x-ui-admin";
import { Service } from "@bluelibs/core";
import { IComponents, XRouter, use } from "@bluelibs/x-ui";
import * as Ant from "antd";
import {
  NoteModel,
  EndUsersCollection,
  NoteModelsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class NoteModelListFiltersForm extends XForm {
  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.note_models.fields.name"),
        name: ["name"],
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.Input />
          </Ant.Form.Item>
        ),
      },

      {
        id: "fields",
        label: t("management.note_models.fields.fields"),
        name: ["fields"],
        columns: true,
        nest: [
          {
            id: "id",
            label: t("management.note_models.fields.id"),
            name: ["fields", "id"],
            required: true,
            initialValue: [],
            component: Ant.Input,
          },

          {
            id: "name",
            label: t("management.note_models.fields.name"),
            name: ["fields", "name"],
            required: true,
            initialValue: [],
            component: Ant.Input,
          },

          {
            id: "isArray",
            label: t("management.note_models.fields.isArray"),
            name: ["fields", "isArray"],
            required: true,
            initialValue: [],
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
            id: "type",
            label: t("management.note_models.fields.type"),
            name: ["fields", "type"],
            required: true,
            initialValue: [],
            render: (props) => (
              <Ant.Form.Item {...props}>
                <Ant.Select
                  placeholder={t("management.note_models.fields.type")}
                >
                  <Ant.Select.Option value="BOOLEAN" key="BOOLEAN">
                    Boolean
                  </Ant.Select.Option>
                  <Ant.Select.Option value="ENUM" key="ENUM">
                    Enum
                  </Ant.Select.Option>
                  <Ant.Select.Option value="NUMBER" key="NUMBER">
                    Number
                  </Ant.Select.Option>
                  <Ant.Select.Option value="STRING" key="STRING">
                    String
                  </Ant.Select.Option>
                  <Ant.Select.Option value="OBJECT" key="OBJECT">
                    Object
                  </Ant.Select.Option>
                </Ant.Select>
              </Ant.Form.Item>
            ),
          },

          {
            id: "enumValues",
            label: t("management.note_models.fields.enumValues"),
            name: ["fields", "enumValues"],
            required: true,
            isList: true,
            nest: [],
            initialValue: [],
          },
        ],
      },

      {
        id: "createdAt",
        label: t("management.note_models.fields.createdAt"),
        name: ["createdAt"],
        tooltip: t("management.note_models.fields.createdAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "updatedAt",
        label: t("management.note_models.fields.updatedAt"),
        name: ["updatedAt"],
        tooltip: t("management.note_models.fields.updatedAt_description"),
        render: (props) => (
          <Ant.Form.Item {...props}>
            <Ant.DatePicker.RangePicker />
          </Ant.Form.Item>
        ),
      },

      {
        id: "endUserId",
        label: t("management.note_models.fields.endUser"),
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
