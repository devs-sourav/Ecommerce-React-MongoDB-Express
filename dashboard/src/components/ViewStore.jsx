import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Button, Col, Badge, message, Popconfirm, Modal, Form, Input } from 'antd';
import { CheckOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useSelector } from 'react-redux';


const ViewStore = () => {
    const [viewCategoryList, setViewCategoryList] = useState([]);
    const [username, setUsername] = useState([]);
    const [tradeNumber, setTradeNumber] = useState([]);
    const [voterID, setVoterId] = useState([]);
    const [editId, setEditId] = useState('');
    const data = useSelector((state) => state.user.value);
    // const [isModalOpen, setIsModalOpen] = useState(false);
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/product/viewstore');
        const modifiedData = response.data.map(item => ({
          ...item,
          status: item.isActive ? 'Active' : 'Inactive',
        }));
        const uniqueUsernames = [...new Set(response.data.map(item => item.storename))].map(name => ({
          text: name,
          value: name,
        }));
        const uniqueTradeNumbers = [...new Set(response.data.map(item => item.tradenumber))].map(name => ({
          text: name,
          value: name,
        }));
        const uniqueVoterID = [...new Set(response.data.map(item => item.voterid))].map(name => ({
          text: name,
          value: name,
        }));
        setUsername(uniqueUsernames);
        setTradeNumber(uniqueTradeNumbers);
        setVoterId(uniqueVoterID);
        setViewCategoryList(modifiedData);
        console.log(viewCategoryList)
    } catch (error) {
        console.error('Error fetching data:', error);
        message.error('Failed to fetch data. Please try again.', 0.8);
      }
    };
  
    const confirmDelete = async (_id) => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/product/deletestore', { id: _id });
        if (response.data.success) {
          message.success('Sub-Category deleted successfully!', 0.8);
          fetchData(); // Refresh category list
        } else {
          message.error('Failed to delete Sub-category. Please try again.', 0.8);
        }
      } catch (error) {
        console.error('Error deleting Sub-category:', error);
        message.error('Failed to delete Sub-category. Please try again.', 0.8);
      }
    };
  
    const handleIdle = async (_id) => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/product/idlestore', { id: _id });
        if (response.data.success) {
          message.success('Sub-Category idled successfully!', 0.8);
          fetchData();
        }
      } catch (error) {
        message.error('Failed to idle Sub-Category', 0.8);
      }
    };
  
    const approveActive = async (_id) => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/product/approvestore', { id: _id, isActive: true });
        console.log(response)
        if (response.data.success) {
          message.success('Sub-Category approved successfully!', 0.8);
          fetchData(); // Refresh category list
        } else {
          message.error('Failed to approve Sub-Category. Please try again.', 0.8);
        }
      } catch (error) {
        console.error('Error approving Sub-Category:', error);
        message.error('Failed to approve Sub-Category. Please try again.', 0.8);
      }
    };
  
    const handleApprove = async (_id) => {
      // Assuming approval is triggered by a button click event
      await approveActive(_id);
    };
  
    const columns = [
      {
        title: 'Store Name',
        dataIndex: 'storename',
        filters: username,
        filterSearch: true,
        onFilter: (value, record) => record.storename.indexOf(value) === 0,
        sorter: (a, b) => a.storename.localeCompare(b.storename),
        key: 'storename',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Trade Number',
        dataIndex: 'tradenumber',
        filters: tradeNumber,
        filterSearch: true,
        onFilter: (value, record) => record.tradenumber.indexOf(value) === 0,
        sorter: (a, b) => a.tradenumber.localeCompare(b.tradenumber),
        key: 'tradenumber',
      },
      {
        title: 'Voter ID',
        dataIndex: 'voterid',
        filters: voterID,
        filterSearch: true,
        onFilter: (value, record) => record.voterid.indexOf(value) === 0,
        sorter: (a, b) => a.voterid.localeCompare(b.voterid),
        key: 'voterid',
      },
      {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        filters: [
          { text: 'Active', value: 'active' },
          { text: 'Inactive', value: 'inactive' },
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
          <Space size="middle">
            {record.isActive ? 
              <Button type="primary" onClick={() => handleIdle(record._id)} danger><CloseOutlined/></Button> :
              <Button type="primary" style={{ backgroundColor: '#52c41a', borderColor: '#52c411' }} onClick={() => handleApprove(record._id)}><CheckOutlined /></Button>
            }
            {
              ( data.role == 'Admin') && 
              <Popconfirm
              title="Are you sure to delete this category?"
              onConfirm={() => confirmDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger><DeleteOutlined /></Button>
            </Popconfirm>
            }
  
            {/* <Button type="primary" onClick={() => showModal(record._id)}>Edit</Button> */}
          </Space>
        ),
      },
    ];
  
    // const showModal = (id) => {
    //   setEditId(id);
    //   setIsModalOpen(true);
    // };
  
    // const handleOk = () => {
    //   setIsModalOpen(false);
    // };
  
    // const handleCancel = () => {
    //   setIsModalOpen(false);
    //   setEditId('');
    // };
  
    // const onFinish = async (values) => {
    //   try {
    //     const response = await axios.post('http://localhost:8000/api/v1/product/editcategory', { name: values.name, id: editId });
    //     if (response.data.success) {
    //       message.success('Category edited successfully!', 0.8);
    //       fetchData(); // Refresh category list
    //       setIsModalOpen(false);
    //     } else {
    //       message.error('Failed to edit category. Please try again.', 0.8);
    //     }
    //   } catch (error) {
    //     console.error('Error editing category:', error);
    //     message.error('Failed to edit category. Please try again.', 0.8);
    //   }
    // };
  
    // const onFinishFailed = (errorInfo) => {
    //   console.log('Failed:', errorInfo);
    // };
  
    return (
      <Col span={24}>
        {/* <Modal
          title="Edit Category"
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Category Name"
              name="name"
              rules={[{ required: true, message: 'Please input your category name!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
              <Button type="primary" onClick={handleCancel}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal> */}
        <h2 style={{ color: '#22222' }}>Sub-Categories <Badge count={viewCategoryList.length} style={{ backgroundColor: '#52c41a' }} /></h2>
        <Table columns={columns} dataSource={viewCategoryList} rowKey="id" />
      </Col>
    );
}

export default ViewStore