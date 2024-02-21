import { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Col, Badge, message, Popconfirm } from 'antd';
import { CheckOutlined,DeleteOutlined,CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AllCategory = () => {
  const [viewCategoryList, setViewCategoryList] = useState([]);
  const [loadingApprove, setLoadingApprove] = useState(false);
  const [loadingIdle, setLoadingIdle] = useState(false);
  const [username, setUsername] = useState([]);
  const data = useSelector((state) => state.user.value);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/product/viewcategory');
      const modifiedData = response.data.map(item => ({
        ...item,
        status: item.isActive ? 'Active' : 'Inactive',
        ownerName: item.ownerId.name,
        ownerEmail: item.ownerId.email,
      }));
      
      const uniqueUsernames = [...new Set(response.data.map(item => item.name))].map(name => ({
        text: name,
        value: name,
      }));
  
      setUsername(uniqueUsernames);
      setViewCategoryList(modifiedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const confirmDelete = async (_id) => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/product/deletecategory', { id: _id });
      if (response.data.success) {
        message.success('Category deleted successfully!', 0.8);
        fetchData(); // Refresh category list
      } else {
        message.error('Failed to delete category. Please try again.', 0.8);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      message.error('Failed to delete category. Please try again.', 0.8);
    }
  };

  const handleIdle = async (_id) => {
    try {
      setLoadingIdle(true);
      const response = await axios.post('http://localhost:8000/api/v1/product/idlecategory', { id: _id });
      if (response.data.success) {
        message.success('Category idled successfully!', 0.8);
        fetchData();
      }
    } catch (error) {
      message.error('Failed to idle Category', 0.8);
    } finally {
      setLoadingIdle(false);
    }
  };

  const handleApprove = async (_id) => {
    try {
      setLoadingApprove(true);
      const response = await axios.post('http://localhost:8000/api/v1/product/approvecategory', { id: _id, isActive: true });
      if (response.data.success) {
        message.success('Category approved successfully!', 0.8);
        fetchData(); // Refresh category list
      } else {
        message.error('Failed to approve category. Please try again.', 0.8);
      }
    } catch (error) {
      console.error('Error approving category:', error);
      message.error('Failed to approve category. Please try again.', 0.8);
    } finally {
      setLoadingApprove(false);
    }
  };

  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      filters: username,
      filterSearch: true,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.localeCompare(b.name),
      // defaultSortOrder: 'ascend', 
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    
    {
      title: 'Owner Name',
      dataIndex: 'ownerName',
      key: 'ownerName',
      // defaultSortOrder: 'ascend',
      sorter: (a, b) => a.ownerName.localeCompare(b.ownerName),
    },
    {
      title: 'Owner Email',
      dataIndex: 'ownerEmail',
      key: 'ownerEmail',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      filters: [
        {
          text: 'ACTIVE',
          value: 'active',
        },
        {
          text: 'INACTIVE',
          value: 'inactive',
        },
      ],
      onFilter: (value, record) => record.status.toLowerCase() === value.toLowerCase(),
      render: (status) => (
        <Tag color={status.toLowerCase() === 'active' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" key={record._id}>
          {/* {(record.ownerId.role === 'Merchant') && <Button type="primary">Edit</Button>}
          {(record.ownerId.role === 'Admin') && ((record.isActive === false) ? (loadingApprove ? <Button type="primary" loading></Button> : <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c411' }} onClick={() => handleApprove(record._id)}><CheckOutlined /></Button>) : (loadingIdle ? <Button type="primary" loading><CloseOutlined/></Button> : <Button type="primary" onClick={() => { handleIdle(record._id) }} danger><CloseOutlined/></Button>))} */}
          {
            ( data.role == 'Admin')  ? (record.isActive == false ? <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c411' }} onClick={() => handleApprove(record._id)}><CheckOutlined /></Button>:<Button type="primary" onClick={() => { handleIdle(record._id) }} danger><CloseOutlined/></Button>)
            : 
            ((record.ownerId.role == 'Merchant') && (data._id == record.ownerId._id) && (data.role == 'Merchant')) && <Button type="primary">Edit</Button>
          }
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => { confirmDelete(record._id) }}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Col span={24}>
      <h2 style={{ color: '#22222' }}>Categories <Badge count={viewCategoryList.length > 0 ? viewCategoryList.length : ''} style={{ backgroundColor: '#52c41a' }}></Badge></h2>
      <Table columns={columns} dataSource={viewCategoryList} rowKey="id" />
    </Col>
  );
};

export default AllCategory;
