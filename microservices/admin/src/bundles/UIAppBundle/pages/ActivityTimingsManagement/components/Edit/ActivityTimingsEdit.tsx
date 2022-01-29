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
import { ActivityTimingEditForm } from "../../config/ActivityTimingEditForm";
import { features } from "../../config/features";
import {
  ActivityTiming,
  ActivityTimingsCollection,
} from "@bundles/UIAppBundle/collections";

const formLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formTailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export function ActivityTimingsEdit(props: { id: string }) {
  const UIComponents = useUIComponents();
  const t = useTranslate();
  const form = use(ActivityTimingEditForm, { transient: true });
  const router = useRouter();
  const collection = use(ActivityTimingsCollection);

  const {
    data: document,
    isLoading,
    error,
  } = useDataOne(
    ActivityTimingsCollection,
    new ObjectId(props.id),
    ActivityTimingEditForm.getRequestBody()
  );

  form.build();

  return (
    <UIComponents.AdminLayout>
      <Ant.PageHeader
        title={t("management.activity_timings.edit.header")}
        onBack={() => window.history.back()}
        extra={
          features.view
            ? [
                <Link
                  key="view"
                  to={router.path(Routes.ACTIVITY_TIMINGS_VIEW, {
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
            initialValues={document as ActivityTiming}
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
