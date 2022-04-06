import React, { useState } from 'react';
import styles from './index.less';
import {
  Row,
  Col,
  Divider,
  message,
  Button,
  Card,
  Space,
  Modal,
  Form,
  Input,
  ModalProps,
  ButtonProps,
  Select,
  FormInstance,
  Popconfirm,
} from 'antd';
import { useRequest } from 'ahooks';
import {
  createTestplanApiTestplan_post,
  deleteTestplanApiTestplan_uuid_delete,
  getPageApiTestplanPage_index_get,
  getPageDescriptionApiTestplanPageDescriptionGet,
  updateTestplanApiTestplan_uuid_patch,
} from '@/services/swagger/TestplanManagement';
import TextArea from 'antd/lib/input/TextArea';

import { FormModal, useFormModal } from '@/components/InputComponent/FormModal';

type PlanCardProps = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  title: string;
  loading?: boolean;
};
const PlanCard = (props: PlanCardProps) => {
  return (
    <Card
      extra={props.extra}
      bordered={true}
      hoverable={true}
      title={props.title}
      loading={props.loading}
    >
      {props.children}
    </Card>
  );
};
export default () => {
  const { data: planArray, refresh } = useRequest(() => {
    return getPageApiTestplanPage_index_get({ index: 1, page_size: -1 });
  }, {});
  const { formModal, openModal, closeModal } = useFormModal();
  const UnEditable = undefined;
  const [editPlan, setEditPlan] = useState<Partial<API.TestPlanProps> | undefined>(UnEditable);

  return (
    // {!loading && message.info(data)}
    <div className={styles.container}>
      <Button
        type="primary"
        onClick={() => {
          setEditPlan(UnEditable);
          openModal(
            (formRef) => {
              formRef
                .validateFields()
                .then((values) => {
                  createTestplanApiTestplan_post({ ...values })
                    .then((res) => {
                      message.success(`${res.name} created`);
                      closeModal();
                      formRef.resetFields();
                      refresh();
                    })
                    .catch((err) => {
                      message.error("Can't create plan");
                    });
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
            },
            function onCancel(formRef) {
              formRef.resetFields();
              closeModal();
            },
          );
        }}
      >
        Add Plan
      </Button>
      <Divider />
      <div id="components-grid-demo-gutter">
        <>
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {planArray
              ?.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
              ?.map((plan) => (
                <Col key={plan.uuid} className="gutter-row" span={6}>
                  <PlanCard
                    title={plan.name}
                    extra={
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => {
                            setEditPlan(plan);
                            openModal(
                              function onfinish(formref) {
                                formref.validateFields().then((values) => {
                                  updateTestplanApiTestplan_uuid_patch(
                                    { uuid: plan.uuid },
                                    { ...values },
                                  ).then((resp) => {
                                    closeModal();
                                    formref.resetFields();
                                    refresh();
                                  });
                                });
                                return true;
                              },
                              function onCancel(formRef) {
                                formRef.resetFields();
                                closeModal();
                              },
                            );
                          }}
                        >
                          Edit
                        </Button>
                        <Popconfirm
                          title="do you want to delete?"
                          onConfirm={(e) => {
                            deleteTestplanApiTestplan_uuid_delete({ uuid: plan.uuid }).then(
                              (resp) => {
                                message.success(`${plan.name} deleted!`);
                                refresh();
                              },
                            );
                          }}
                        >
                          <Button danger={true}>Delete</Button>
                        </Popconfirm>
                      </Space>
                    }
                  >
                    {plan.description}
                  </PlanCard>
                </Col>
              ))}
          </Row>
        </>
      </div>
      <FormModal title={editPlan ? 'Edit TestPlan' : 'Add TestPlan'} formModal={formModal}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Please Input Testplan Name',
            },
            { min: 3, message: 'No More than 255 Characters' },
            {
              pattern: new RegExp('^[a-zA-Z0-9 ]+$'),
              message: 'Only letters, numbers, and Space are allowed',
            },
          ]}
          initialValue={editPlan?.name}
        >
          <Input allowClear={true} />
        </Form.Item>
        <Form.Item label="Labels" name="labels" initialValue={editPlan?.lables}>
          <Select mode="tags" allowClear={true} />
        </Form.Item>
        <Form.Item label="Description" name="description" initialValue={editPlan?.description}>
          <TextArea rows={5} />
        </Form.Item>
      </FormModal>
    </div>
  );
};
