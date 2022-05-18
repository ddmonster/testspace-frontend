import {
  getTestcaseApiTestcase_uuid_get,
  updateCaseApiTestcase_uuid_patch,
} from '@/services/swagger/TestcaseManagement';
import {
  getTestplanApiTestplan_uuid_get,
  updateTestplanApiTestplan_uuid_patch,
} from '@/services/swagger/TestplanManagement';
import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import {
  Breadcrumb,
  Button,
  Col,
  Comment,
  Form,
  List,
  message,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Tooltip,
} from 'antd';
import { useContext, useRef, useState } from 'react';
import { Link, useRequest } from 'umi';
import ProProvider from '@ant-design/pro-provider';
import React from 'react';
import ProList from '@ant-design/pro-list';
import ProForm, {
  ModalForm,
  ModalFormProps,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { EditOutlined } from '@ant-design/icons';
import { EditableText } from '@/components/InputComponent/editable';
import {
  createTestsuitApiTestsuit_post,
  deleteTestsuitApiTestsuit_uuid_delete,
  updateTestsuitApiTestsuit_uuid_patch,
} from '@/services/swagger/testsuitManagement';
import moment from 'moment';
import { TagsMap } from '@/components/InputComponent/tagsRender';
import { history } from 'umi';
const TestSuitEdit: React.FC<{
  uuid_plan?: string;
  button_name: string;
  refresh: () => void;
  defaluvalue?: Pick<API.TestSuitCreate, 'name' | 'labels' | 'description'>;
  uuid?: string;
  filedProps?: ModalFormProps;
}> = ({ uuid, refresh, defaluvalue, uuid_plan, filedProps, button_name }) => {
  return (
    <ModalForm
      trigger={
        <Button key="add" type="primary">
          {button_name}
        </Button>
      }
      {...filedProps}
      wrapperCol={{ span: 16 }}
      grid={true}
      onFinish={(formdata: any) => {
        if (uuid) {
          formdata as Pick<API.TestSuitUpdate, 'description' | 'labels' | 'name'>;
          return updateTestsuitApiTestsuit_uuid_patch({ uuid: uuid }, { ...formdata }).then(() => {
            refresh();
            return Promise.resolve(true);
          });
        } else {
          formdata as Pick<API.TestSuitCreate, 'description' | 'labels' | 'name'>;
          return createTestsuitApiTestsuit_post({ ...formdata, testplans: [uuid_plan] }).then(
            () => {
              refresh();
              return Promise.resolve(true);
            },
          );
        }
      }}
    >
      <ProFormText
        name="name"
        label={<span>{'name'}</span>}
        width="md"
        rules={[{ required: true, message: 'this feild is required' }]}
        initialValue={defaluvalue?.name}
      />
      <ProFormSelect mode="tags" name="labels" label="labels" initialValue={defaluvalue?.labels} />
      <ProFormTextArea
        name="description"
        label={'description'}
        width="md"
        initialValue={defaluvalue?.description}
      />
    </ModalForm>
  );
};

export default (props) => {
  const values = useContext(ProProvider);
  const actionRef = useRef();
  // console.log(props.route);
  const { planname, planuuid } = props.match.params;
  console.log(props.match);
  const { data, loading, refresh } = useRequest(
    () => {
      return getTestplanApiTestplan_uuid_get({ uuid: planuuid, details: true });
    },
    {
      formatResult: (response: any) => {
        return response;
      },
    },
  );
  return (
    <PageContainer
      style={{ width: 'fit-content' }}
      loading={loading}
      title={
        !loading ? (
          <EditableText
            value={planname || ''}
            onSave={(value) => {
              updateTestplanApiTestplan_uuid_patch({ uuid: planuuid }, { name: value }).then(() => {
                refresh();
                message.info(`change name ${planname} to ${value}`);
              });
            }}
          />
        ) : (
          ''
        )
      }
    >
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            ...TagsMap,
          },
        }}
      >
        <ProDescriptions
          loading={loading}
          actionRef={actionRef}
          dataSource={data}
          size={'middle'}
          column={{ lg: 2, xs: 1 }}
          editable={{
            formProps: {},
            onSave: (key, record) => {
              // debugger;
              return updateTestplanApiTestplan_uuid_patch({ uuid: planuuid }, { ...record }).then(
                (resp) => {
                  refresh();
                  return resp;
                },
              );
            },
          }}
          bordered={false}
          columns={[
            // { title: 'description', dataIndex: 'description', key: 'text' },
            {
              title: 'Labels',
              dataIndex: 'labels',
              valueType: 'tags',
              span: 2,

              fieldProps: { size: 'large' },
            },
            {
              title: 'Created_at',
              dataIndex: 'created_at',
              valueType: 'dateTime',
              editable: false,
            },
            { title: 'CreatedBy', dataIndex: 'create_by', editable: false },
            { title: 'LastChange', dataIndex: 'updated_at', valueType: 'fromNow', editable: false },
            { title: 'LastChangeBy', dataIndex: 'update_by', editable: false },

            {
              title: 'Description',
              dataIndex: 'description',
              valueType: 'textarea',
              span: 2,
              
              contentStyle: { whiteSpace: 'pre-wrap' },
              formItemProps: {
                rules: [{ required: true, message: 'should not be empty' }],
              },
              fieldProps: { cols: '200', rows: '30' },
            },
          ]}
        />
        <ProList<any>
          toolBarRender={() => {
            return [
              <TestSuitEdit
                button_name="add"
                key="add"
                filedProps={{ title: 'Add TestSuit' }}
                refresh={refresh}
                uuid_plan={planuuid}
              />,
            ];
          }}
          onItem={(record: API.TestSuitProps) => {
            return {
              onClick: (e) => {
                history.push(
                  `/testcase/testplan/${planname}/${planuuid}/testsuite/${record.name}/${record.uuid}`,
                );
              },
            };
          }}
          rowKey="name"
          headerTitle="TestSuites"
          tooltip="testsuits"
          dataSource={(data as API.TestPlanProps)?.testsuits || []}
          showActions="always"
          showExtra="hover"
          grid={{ gutter: 16, xs: 1, column: 2 }}
          metas={{
            title: {
              dataIndex: 'name',
            },
            // avatar: {
            //   dataIndex: 'labels',
            // },
            content: {
              dataIndex: 'description',
            },
            subTitle: {
              render: (_, entity) => {
                return (
                  <Space size={0}>
                    {entity?.labels.map((value: string) => {
                      return <Tag key={value}>{value}</Tag>;
                    })}
                  </Space>
                );
              },
            },
            actions: {
              render: (dom, entity: API.TestSuitProps) => [
                <Popconfirm
                  key="delete"
                  title={`do you want to delete ${entity.name}?`}
                  onConfirm={() => {
                    deleteTestsuitApiTestsuit_uuid_delete({ uuid: entity.uuid }).then((resp) => {
                      message.success(`${entity.name} deleted!`);
                      refresh();
                    });
                  }}
                >
                  <Button danger={true}>Delete</Button>
                </Popconfirm>,
                <TestSuitEdit
                  button_name="edit"
                  key="edit"
                  filedProps={{ title: 'Edit TestSuit' }}
                  refresh={refresh}
                  uuid={entity.uuid}
                  defaluvalue={entity}
                />,
              ],
            },
          }}
        />
        <List
          header={`1 replies`}
          dataSource={[
            {
              actions: [<span key="comment-list-reply-to-0">Reply to</span>],
              author: 'Han Solo',
              avatar: 'https://joeschmoe.io/api/v1/random',
              content: (
                <p>
                  We supply a series of design principles, practical patterns and high quality
                  design resources (Sketch and Axure), to help people create their product
                  prototypes beautifully and efficiently.
                </p>
              ),
              datetime: (
                <Tooltip title={moment().subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment().subtract(1, 'days').fromNow()}</span>
                </Tooltip>
              ),
            },
          ]}
          itemLayout="horizontal"
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </ProProvider.Provider>
    </PageContainer>
  );
};
