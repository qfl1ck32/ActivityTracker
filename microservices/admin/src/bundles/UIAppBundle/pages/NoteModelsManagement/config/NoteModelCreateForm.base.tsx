/** @overridable */
import { XRouter, use, IComponents } from "@bluelibs/x-ui";
import { SmileOutlined } from "@ant-design/icons";
import * as Ant from "antd";
import { XFormElementType, XForm } from "@bluelibs/x-ui-admin";
import { Routes } from "@bundles/UIAppBundle";
import { Service, Inject } from "@bluelibs/core";
import { features } from "./features";

import {
  NoteModel,
  EndUsersCollection,
  NoteModelsCollection,
} from "@bundles/UIAppBundle/collections";

@Service({ transient: true })
export class NoteModelCreateForm extends XForm {
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

  onSubmit(document: Partial<NoteModel>): Promise<void> {
    const { t } = this.i18n;

    return this.collection
      .insertOne(document)
      .then(({ _id }) => {
        Ant.notification.success({
          message: t("generics.success"),
          description: t("management.note_models.create_confirmation"),
          icon: <SmileOutlined />,
        });

        if (features.view) {
          return this.router.go(Routes.NOTE_MODELS_VIEW, {
            params: {
              id: _id,
            },
          });
        }
        if (features.list) {
          return this.router.go(Routes.NOTE_MODELS_LIST);
        }
        if (features.edit) {
          return this.router.go(Routes.NOTE_MODELS_EDIT, {
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
