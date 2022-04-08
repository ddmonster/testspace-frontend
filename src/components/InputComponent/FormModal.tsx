import { Form, FormInstance, Modal } from 'antd';
import { useEffect, useState } from 'react';
type PlanModalProps = {
  title?: React.ReactNode;
  children?: React.ReactNode;
  formModal?: FormModalInstance;
  okText?: string;
  cancelText?: string;
};
type FormModalInstance = {
  visible?: boolean;
  onFinish?: (formref: FormInstance) => void;
  onCancel?: (formref: FormInstance) => void;
  forRef?: FormInstance;
};
const useFormModal = () => {
  const [formModal, setFormModal] = useState<FormModalInstance>({
    visible: false,
  });
  const openModal = (
    onfinish: (formref: FormInstance) => void,
    onCancel?: (formref: FormInstance) => void,
  ) => {
    setFormModal({ visible: true, onFinish: onfinish, onCancel: onCancel });
  };
  const closeModal = () => {
    setFormModal({ visible: false });
  };
  return { formModal, openModal, closeModal };
};
const FormModal = (props: PlanModalProps) => {
  const [formRef] = Form.useForm();
  return (
    <Modal
      title={props.title}
      visible={props.formModal?.visible}
      keyboard={true}
      closable={true}
      destroyOnClose={true}
      afterClose={() => {
        formRef.resetFields();
      }}
      onOk={() => {
        formRef.submit();
        if (props.formModal?.onFinish) {
          props.formModal.onFinish(formRef);
        }
      }}
      onCancel={() => {
        if (props.formModal?.onCancel) {
          props.formModal.onCancel(formRef);
        }
      }}
      // width={'50vw'}
    >
      <Form
        form={formRef}
        labelCol={{ span: 5, offset: 0 }}
        wrapperCol={{ span: 21 }}
        validateTrigger={['onChange', 'onBlur', 'onSubmit']}
      >
        {props.children}
      </Form>
    </Modal>
  );
};

export { FormModal, useFormModal };
