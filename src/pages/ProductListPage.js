
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Row, Col, Input, Select, message } from 'antd';
import ProductTable from '../components/ProductTable';
import AddProductPage from './AddProductPage';
import EditProductModal from '../components/EditProductModal';
import './ProductListPage.css';

const { Search } = Input;
const { Option } = Select;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const mockProducts = [
      { id: 1, category: 'Electronics', name: 'TUF Gaming', description: 'ASUS TUF Gaming F15 - AI Powered Gaming Intel Core i5 11th Gen 11260H - (8 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce RTX 2050/144 Hz/70 TGP) FX506HF-HN075W Gaming Laptop  (15.6 Inch, Graphite Black, 2.30 kg)', price: '₹53,990.00' },
      { id: 2, category: 'T-Shirt', name: 'Allen Solly', description: 'Men Solid Polo Neck Cotton Blend Black T-Shirt', price: '₹637.00' },
      { id: 3, category: 'Footware', name: 'NIKE Shoe', description: 'Revolution 7 Running Shoes For Men  (Grey)', price: '₹3,325.00' },
      { id: 4, category: 'T-Shirt', name: 'Veirdo ', description: 'Oversize Men Tie & Dye Round Neck Pure Cotton Multicolor T-Shirt', price: '₹399.00' },
      { id: 5, category: 'Electronics', name: 'Iqoo', description: 'IQOO Neo9 Pro (Fiery Red, 256 GB)  (8 GB RAM)', price: '₹37,990.00' },
      { id: 6, category: 'Electronics', name: 'TUF Gaming', description: 'ASUS TUF Gaming F15 - AI Powered Gaming Intel Core i5 11th Gen 11260H - (8 GB/512 GB SSD/Windows 11 Home/4 GB Graphics/NVIDIA GeForce RTX 2050/144 Hz/70 TGP) FX506HF-HN075W Gaming Laptop  (15.6 Inch, Graphite Black, 2.30 kg)', price: '₹53,990.00' },
      { id: 7, category: 'T-Shirt', name: 'Allen Solly', description: 'Men Solid Polo Neck Cotton Blend Black T-Shirt', price: '₹637.00' },
      { id: 8, category: 'Footware', name: 'NIKE Shoe', description: 'Revolution 7 Running Shoes For Men  (Grey)', price: '₹3,325.00' },
      { id: 9, category: 'T-Shirt', name: 'Veirdo ', description: 'Oversize Men Tie & Dye Round Neck Pure Cotton Multicolor T-Shirt', price: '₹399.00' },
      { id: 10, category: 'Electronics', name: 'Iqoo', description: 'IQOO Neo9 Pro (Fiery Red, 256 GB)  (8 GB RAM)', price: '₹37,990.00' },
      { id: 10, category: 'Electronics', name: 'Iqoo', description: 'IQOO Neo9 Pro (Fiery Red, 256 GB)  (8 GB RAM)', price: '₹37,990.00' },
    ];
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const handleDelete = (product) => {
    const updatedProducts = products.filter((p) => p.id !== product.id);
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts.filter((p) => p.id !== product.id));
    message.success('Product deleted successfully');
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalVisible(true);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    filterProducts(value, categoryFilter);
  };

  const handleCategoryFilter = (value) => {
    if (value === 'clear') {
      setCategoryFilter(null);
    } else {
      setCategoryFilter(value);
    }
    filterProducts(searchText, value);
  };

  const filterProducts = (searchText, category) => {
    let filtered = [...products];
    if (searchText) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase()) ||
        product.description.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (category) {
      if (category === 'clear') {
        setFilteredProducts(filtered);
        return;
      }
      filtered = filtered.filter((product) => product.category === category);
    }
    setFilteredProducts(filtered);
  };

  const onUpdateProducts = (newProduct) => {
    const updatedProducts = [...products, { id: products.length + 1, ...newProduct }];
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    message.success('Product added successfully');
  };

  const handleEditSubmit = (values) => {
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? { ...product, ...values } : product
    );
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
    setEditModalVisible(false);
    message.success('Product updated successfully');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
      <div>
        <h1>PRODUCT MANAGEMENT APPLICATION</h1>
      </div>
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col>
          <Button type="primary" onClick={() => setShowAddProductForm(true)}>Add Product</Button>
        </Col>
        <Col span={8} offset={8}>
          <Search
            placeholder="Search by product name or description"
            onSearch={handleSearch}
            style={{ width: '100%' }}
          />
        </Col>
        <Col span={4}>
          <Select
            placeholder="Filter by category"
            onChange={handleCategoryFilter}
            style={{ width: '100%' }}
          >
            <Option value="Electronics">Electronics</Option>
            <Option value="T-Shirt">T-Shirt</Option>
            <Option value="Footware">Footware</Option>
            <Option value="clear">Clear</Option>
          </Select>
        </Col>
      </Row>
      {showAddProductForm && (
        <div>
          <AddProductPage onUpdateProduct={onUpdateProducts} />
          <Button onClick={() => setShowAddProductForm(false)}>Back</Button>
        </div>
      )}
      <EditProductModal
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onSubmit={handleEditSubmit}
        product={selectedProduct}
      />
      <ProductTable
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </motion.div>
  );
};

export default ProductListPage;
