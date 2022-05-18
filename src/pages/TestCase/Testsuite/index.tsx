import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer } from 'antd';
import React, { useState, useRef, useContext } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from './service';
import type { TableListItem, TableListPagination } from './data';
import { useParams } from 'umi';
import { TagsMap } from '@/components/InputComponent/tagsRender';
import ProProvider from '@ant-design/pro-provider';
import { getPageApiTestsuitPage_index_get } from '@/services/swagger/testsuitManagement';
import {
  getPageApiTestcasePage_index_get,
  getTestcaseApiTestcase_uuid_get,
} from '@/services/swagger/TestcaseManagement';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('adding');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  const { suitname, suituuid } = useParams<{ suitname: string; suituuid: string }>();
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */
  const values = useContext(ProProvider);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'CaseName',
      dataIndex: 'name',
      tip: 'test case name',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: 'Labels',
      dataIndex: 'labels',
      valueType: 'tags',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_at',
      sorter: true,
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '运行中',
          status: 'Processing',
        },
        2: {
          text: '已上线',
          status: 'Success',
        },
        3: {
          text: '异常',
          status: 'Error',
        },
      },
    },
    {
      title: '上次调度时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];

  return (
    <PageContainer title={suitname}>
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            ...TagsMap,
          },
        }}
      >
        <ProTable<TableListItem, TableListPagination>
          headerTitle="Test Cases"
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: 'auto',
          }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> Add
            </Button>,
          ]}
          request={async ({ pageSize, current, keyword }) => {
            const data = getPageApiTestcasePage_index_get({
              page_size: pageSize,
              index: current - 1,
            });
            return Promise.resolve({ data: data, success: true });
          }}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => {
              setSelectedRows(selectedRows);
            },
          }}
        />
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择{' '}
                <a
                  style={{
                    fontWeight: 600,
                  }}
                >
                  {selectedRowsState.length}
                </a>{' '}
                项 &nbsp;&nbsp;
                <span>
                  服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
                  万
                </span>
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
            <Button type="primary">批量审批</Button>
          </FooterToolbar>
        )}
        <ModalForm
          title="Add Testcase"
          visible={createModalVisible}
          onVisibleChange={handleModalVisible}
          onFinish={async (value) => {
            const success = await handleAdd(value as TableListItem);
            if (success) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        >
          <ProFormText
            rules={[
              {
                required: true,
                message: 'this should not be empty',
              },
            ]}
            width="md"
            name="name"
            label="name"
          />
          <ProFormSelect mode="tags" name="labels" label="labels" />
          <ProFormTextArea name="description" label="description" />
        </ModalForm>
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value, currentRow);

            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }}
          updateModalVisible={updateModalVisible}
          values={currentRow || {}}
        />

        <Drawer
          width={600}
          visible={showDetail}
          onClose={() => {
            setCurrentRow(undefined);
            setShowDetail(false);
          }}
          closable={false}
        >
          {currentRow?.name && (
            <ProDescriptions<TableListItem>
              column={2}
              title={currentRow?.name}
              request={async () => ({
                data: currentRow || {},
              })}
              params={{
                id: currentRow?.name,
              }}
              columns={columns as ProDescriptionsItemProps<TableListItem>[]}
            />
          )}
        </Drawer>
      </ProProvider.Provider>
    </PageContainer>
  );
};

export default TableList;
