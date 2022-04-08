import React from 'react';
import styles from './index.less';
import { Breadcrumb } from 'antd';
interface BreadCrumbTreeNode {
  name: string;
  component: React.ReactNode;
  iscurrent?: boolean;
  children?: BreadCrumbTreeNode[];
}

function searchPath(breadCrumbRoot: BreadCrumbTreeNode) {
  if (breadCrumbRoot.iscurrent) {
    return breadCrumbRoot;
  }
  const path: BreadCrumbTreeNode[] = [];
  if (breadCrumbRoot.children) {
    breadCrumbRoot.children.forEach((item) => {
      const rs = searchPath(item);
      if (rs) {
        path.push(rs);
      }
    });
  } else {
    return null;
  }
}
const BreadCrumbList = (props: { breadCrumbList: BreadCrumbTreeNode[] }) => {
  return (
    <div className={styles.container}>
      <div id="components-breadcrumb-demo-basic">
        <Breadcrumb>
          {props.breadCrumbList.map((item, index) => (
            <Breadcrumb.Item key={index}>
              <a
                onClick={() => {
                  props.breadCrumbList.splice(index);
                }}
              >
                {item.name}
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
    </div>
  );
};
