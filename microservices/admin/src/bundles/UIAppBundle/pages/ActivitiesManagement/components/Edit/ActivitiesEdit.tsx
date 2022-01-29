import { Link } from "react-router-dom";
import * as Ant from "antd";
import { ObjectId } from "@bluelibs/ejson";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Routes } from "@bundles/UIAppBundle";
import {
  useUIComponents,
  useRouter,
  use,
  useDataOne,
  useTranslate,
} from "@bluelibs/x-ui";
import { ActivityEditForm } from "../../config/ActivityEditForm";
import { features } from "../../config/features";
import {
  Activity,
  ActivitiesCollection,
} from "@bundles/UIAppBundle/collections";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function ActivitiesEdit(props: { id: string }) {
  const UIComponents = useUIComponents();
  const t = useTranslate();
  const form = use(ActivityEditForm, { transient: true });
  const router = useRouter();
  const collection = use(ActivitiesCollection);

  const {
    data: document,
    isLoading,
    error,
  } = useDataOne(
    ActivitiesCollection,
    new ObjectId(props.id),
    ActivityEditForm.getRequestBody()
  );

  form.build();

  return (
    <UIComponents.AdminLayout>
      <Ant.PageHeader
        title={t("management.activities.edit.header")}
        onBack={() => window.history.back()}
        extra={
          features.view
            ? [
                <Link
                  key="view"
                  to={router.path(Routes.ACTIVITIES_VIEW, {
                    params: { id: props.id },
                  })}
                >
                  <Ant.Button>{t("generics.view")}</Ant.Button>
                </Link>,
              ]
            : []
        }
      />
      <Ant.Card>
        {isLoading && (
          <Ant.Space align="center">
            <Ant.Spin size="large" />
          </Ant.Space>
        )}
        {!isLoading && (error || !document) && (
          <Ant.Alert
            message={error || t("generics.error_message")}
            type="error"
          />
        )}
        {!isLoading && !error && (
          <Ant.Form
            {...formLayout}
            requiredMark="optional"
            initialValues={document as Activity}
            onFinish={(document) => form.onSubmit(props.id, document)}
          >
            {form.render()}
            <Ant.Form.Item {...formTailLayout}>
              <Ant.Button type="primary" htmlType="submit">
                {t("generics.submit")}
              </Ant.Button>
            </Ant.Form.Item>
          </Ant.Form>
        )}
      </Ant.Card>
    </UIComponents.AdminLayout>
  );
}
