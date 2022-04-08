import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less'; // import TestPlan from './TestPlan';

import { UseRequestProvider } from 'umi';
export default () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <PageContainer // content={{}}
      className={styles.main}
    >
      <UseRequestProvider
        value={{
          formatResult(response: any) {
            console.info(response);
            return response;
          },
        }}
      >
        {/* <BreadcrumbBasic />
        
        */}
        {/* <Breadcrumb></Breadcrumb> */}
        {/* <TestPlan /> */}
        <div
          style={{
            paddingTop: 100,
            textAlign: 'center',
          }}
        >
          <Spin spinning={loading} size="large" />
        </div>
      </UseRequestProvider>
    </PageContainer>
  );
};
