import { Space, Tag } from 'antd';

export function tagRender(fontcolor: string) {
  return function __(props: { label: any; value: any; closable: any; onClose: any }) {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: {
      preventDefault: () => void;
      stopPropagation: () => void;
    }) => {
      event.preventDefault();
      event.stopPropagation();
    };
    console.log(props);
    return (
      <Tag
        color={value.split(':')[1]}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3, fontWeight: 'bold' }}
      >
        <span style={{ color: fontcolor }}>{label.split(':')[0]}</span>
      </Tag>
    );
  };
}
