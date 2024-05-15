
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const EditProductModal = ({ visible, onCancel, onSubmit, product }) => {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title="Edit Product"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleFinish} initialValues={product}>
        <Form.Item label="Category" name="category">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProductModal;