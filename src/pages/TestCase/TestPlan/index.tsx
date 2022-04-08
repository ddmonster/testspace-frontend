import React, { useEffect, useState } from 'react';
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
  Tag,
  Tooltip,
  Tabs,
  Spin,
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
import { PageContainer } from '@ant-design/pro-layout';

type PlanCardProps = {
  children?: React.ReactNode;
  extra?: React.ReactNode;
  title: string;
  loading?: boolean;
  tooltip?: string;
  uuid?: string;
};
const PlanCard = (props: PlanCardProps) => {
  return (
    <Tooltip title={props.tooltip} overlayStyle={{ whiteSpace: 'break-spaces' }}>
      <Card
        extra={props.extra}
        bordered={true}
        hoverable={true}
        title={props.title}
        loading={props.loading}
        onClick={(e) => {
          console.log(e);
          message.info(props.uuid + ' Clicked ' + props.title + e);
        }}
      >
        {props.children}
      </Card>
    </Tooltip>
  );
};
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const { data: planArray, refresh } = useRequest(
    () => {
      return getPageApiTestplanPage_index_get({ index: 1, page_size: -1 });
    },
    {
      formatResult: (response: API.TestPlanProps[]) => {
        return response.sort(
          (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        );
      },
    },
  );
  const { formModal, openModal, closeModal } = useFormModal();
  const UnEditable = undefined;
  const [editPlan, setEditPlan] = useState<Partial<API.TestPlanProps> | undefined>(UnEditable);

  return (
    // {!loading && message.info(data)}
    <PageContainer title={false}>
      <div className={styles.container}>
        <Button
          type="primary"
          onClick={() => {
            setEditPlan(UnEditable);
            openModal(
              function onfinish(formRef) {
                formRef
                  .validateFields()
                  .then((values) => {
                    createTestplanApiTestplan_post({ ...values })
                      .then((res) => {
                        message.success(`${res.name} created`);
                        closeModal();
                        refresh();
                      })
                      .catch(() => {
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
        <div>
          <>
            <Row
              gutter={[
                { xs: 8, sm: 16, md: 24, lg: 32 },
                { xs: 8, sm: 16, md: 24, lg: 32 },
              ]}
            >
              {planArray?.map((plan) => (
                <Col key={plan.uuid} className="gutter-row" span={6}>
                  <PlanCard
                    tooltip={plan.description}
                    title={plan.name}
                    uuid={plan.uuid}
                    extra={
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => {
                            setEditPlan({
                              name: plan.name,
                              description: plan.description,
                              labels: plan.labels,
                            });
                            openModal(
                              function onFinish(formref) {
                                formref.validateFields().then((values) => {
                                  updateTestplanApiTestplan_uuid_patch(
                                    { uuid: plan.uuid },
                                    { ...values },
                                  ).then(() => {
                                    closeModal();
                                    refresh();
                                  });
                                });
                                return true;
                              },
                              function onCancel() {
                                closeModal();
                              },
                            );
                          }}
                        >
                          Edit
                        </Button>
                        <Popconfirm
                          title="do you want to delete?"
                          onConfirm={() => {
                            deleteTestplanApiTestplan_uuid_delete({ uuid: plan.uuid }).then(() => {
                              message.success(`${plan.name} deleted!`);
                              refresh();
                            });
                          }}
                        >
                          <Button danger={true}>Delete</Button>
                        </Popconfirm>
                      </Space>
                    }
                  >
                    <div>
                      {plan.labels.map((label) => (
                        <Tag key={label}>{label}</Tag>
                      ))}
                    </div>
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
            initialValue={editPlan ? editPlan.name : ''}
          >
            <Input allowClear={true} />
          </Form.Item>
          <Form.Item label="Labels" name="labels" initialValue={editPlan ? editPlan.labels : []}>
            <Select mode="tags" allowClear={true} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue={editPlan ? editPlan.description : ''}
          >
            <TextArea autoSize={{ minRows: 5, maxRows: 10 }} allowClear={true} />
          </Form.Item>
        </FormModal>
      </div>
    </PageContainer>
  );
};
