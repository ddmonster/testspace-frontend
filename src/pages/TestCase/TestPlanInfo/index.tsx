import ProDescriptions from '@ant-design/pro-descriptions';
import { PageContainer } from '@ant-design/pro-layout';
import { useRef } from 'react';
import { Router } from 'umi';
export default (props) => {
  const actionRef = useRef();
  console.log(props.route, props.match.params);
  const { whichPlan } = props.match.params;
  return (
    <PageContainer title={whichPlan}>
      <ProDescriptions
        actionRef={actionRef}
        columns={[
          { title: 'name', dataIndex: 'name', key: 'name', valueType: 'text' },
          { title: 'description', dataIndex: 'description', key: 'description', valueType: 'text' },
          { title: 'labels', dataIndex: 'labels', key: 'labels', valueType: 'select' },
          { title: 'create_at', dataIndex: 'create_at', key: 'create_at' },
          { title: 'update_at', dataIndex: 'update_at', key: 'update_at' },
        ]}
      ></ProDescriptions>
    </PageContainer>
  );
};
