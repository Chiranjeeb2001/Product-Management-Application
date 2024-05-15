
import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AddProductPage = ({ onUpdateProduct, initialValues }) => {
  const [form] = Form.useForm();
  const history = useNavigate();

  const onFinish = (values) => {
    onUpdateProduct(values);
    form.resetFields();
    history('/'); 
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Failed to add product. Please check the form.');
  };

  return (
    <div>
      <h1>{initialValues ? 'Edit Product' : 'Add Product'}</h1>
      <Form
        form={form}
        name="addProductForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
      >
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select a category">
            <Option value="Electronics">Electronics</Option>
            <Option value="T-Shirt">T-Shirt</Option>
            <Option value="Footware">Footware</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter the product name' }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter the product description' }]}
        >
          <Input.TextArea placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          type="number"
          rules={[{ required: true, message: 'Please enter the product price' }]}
        >
          <Input type="number" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            {initialValues ? 'Save Changes' : 'Add Product'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;