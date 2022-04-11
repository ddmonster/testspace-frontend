import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { useState } from 'react';

export const EditableText = (props: { value: string; onSave: (value: string) => void }) => {
  const [editable, setEditable] = useState(false);
  const [value, setValue] = useState({ origin: props.value, new: props.value });
  return (
    <>
      {!editable ? (
        <Space>
          {value.origin}
          <EditOutlined
            onClick={() => {
              setEditable(true);
            }}
          />
        </Space>
      ) : (
        <Space align="center" direction="horizontal" size="large">
          <Input
            size="large"
            type={'text'}
            defaultValue={value?.origin}
            onChange={(e) => {
              console.log(e);
              setValue((val) => {
                return { origin: val.origin, new: e.target.value };
              });
            }}
          />
          <CheckOutlined
            onClick={() => {
              props.onSave(value.new);
              setValue((val) => {
                return { origin: val.new, new: val.new };
              });
              setEditable(false);
            }}
          />
          <CloseOutlined onClick={() => setEditable(false)} />
        </Space>
      )}
    </>
  );
};
