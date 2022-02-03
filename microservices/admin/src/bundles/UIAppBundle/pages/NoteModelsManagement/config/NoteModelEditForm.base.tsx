/** @overridable */
import { XRouter, use, IComponents, QueryBodyType } from "@bluelibs/x-ui";
import { XForm } from "@bluelibs/x-ui-admin";
import { Service, Inject } from "@bluelibs/core";
import { SmileOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import * as Ant from "antd";
import {
  NoteModel,
  EndUsersCollection,
  NoteModelsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class NoteModelEditForm extends XForm {
  @Inject(() => NoteModelsCollection)
  collection: NoteModelsCollection;

  build() {
    const { UIComponents } = this;
    const { t } = this.i18n;

    this.add([
      {
        id: "name",
        label: t("management.note_models.fields.name"),
        name: ["name"],
        required: true,
        component: Ant.Input,
      },

      {
        id: "fields",
        label: t("management.note_models.fields.fields"),
        name: ["fields"],
        required: true,
        isList: true,
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
                </Ant.Select>
              </Ant.Form.Item>
            ),
          },

          {
            id: "enumValues",
            label: t("management.note_models.fields.enumValues"),
            name: ["fields", "enumValues"],
            initialValue: [],
            component: Ant.Input,
            isList: true,
          },
        ],
        initialValue: [],
      },

      {
        id: "endUserId",
        label: t("management.note_models.fields.endUser"),
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

  static getRequestBody(): QueryBodyType<NoteModel> {
    return {
      _id: 1,
      name: 1,
      fields: {
        id: 1,
        name: 1,
        type: 1,
        enumValues: 1,
      },
      endUser: {
        _id: 1,
        fullName: 1,
      },
      endUserId: 1,
    };
  }

  onSubmit(_id, values: Partial<NoteModel>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .updateOne(_id, { $set: values })
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.note_models.edit_confirmation"),
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
