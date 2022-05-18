import { Row, Select, Space, Tag } from 'antd';
const TagList: React.FC<{
  value?: string[];
  onChange?: (value: string[]) => void;
}> = ({ value, onChange }) => {
  return (
    <>
      <Select
        // autoClearSearchValue={false}
        mode="tags"
        // labelInValue={true}
        style={{ width: '20rem' }}
        value={value}
        onChange={(tags) => {
          onChange?.(tags);
        }}
      />
    </>
  );
};
export const TagsMap = {
  tags: {
    render: (labels) => {
      return (
        <>
          <Row
            gutter={[
              { xs: 1, sm: 2, md: 3, lg: 4 },
              { xs: 1, sm: 2, md: 3, lg: 4 },
            ]}
            style={{ width: '20rem' }}
          >
            {labels.map((label: string) => (
              <Tag key={label}>{label}</Tag>
            ))}
          </Row>
        </>
      );
    },
    renderFormItem: (labels, _props) => (
      <TagList value={labels} {..._props} {..._props?.fieldProps} />
    ),
  },
};
