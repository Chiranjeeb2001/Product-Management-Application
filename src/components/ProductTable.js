
import React from 'react';
import { Table, Button, Space } from 'antd';

const ProductTable = ({ products, onDelete, onEdit }) => {
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price (₹)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="danger" onClick={() => onDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={products} />;
};

export default ProductTable;
