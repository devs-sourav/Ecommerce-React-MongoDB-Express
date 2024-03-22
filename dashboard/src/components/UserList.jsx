import React, { useEffect, useState } from 'react';
import { Col, Table,Badge } from 'antd';
import axios from 'axios';

const UserList = () => {
  const [alluserList, setAllUserList] = useState([]);
  const [username, setUsername] = useState([]);
  useEffect(() => {
    async function fetchUserList() {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/alluserlist');
        setAllUserList(response.data);
        response.data.map(item=>{
            username.push({
              text: item.name,
              value: item.name,
            });
         })
         const uniqueUsernames = [...new Set(response.data.map(item => item.name))].map(name => ({
          text: name,
          value: name,
        }));
    
        setUsername(uniqueUsernames);
      } catch (error) {
        console.error('Error fetching user list:', error);
      }
    }
    fetchUserList();
  }, []);


  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      filters: username,
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '33%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: '34%',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      filters: [
        {
          text: 'Merchant',
          value: 'Merchant',
        },
        {
          text: 'Admin',
          value: 'Admin',
        },
      ],
      onFilter: (value, record) => record.role.startsWith(value),
      filterSearch: true,
      width: '33%',
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <Col span={24}>
      <h2 style={{ color: '#22222' }}>User List <Badge count={alluserList.length > 0 ? alluserList.length : ''} style={{ backgroundColor: '#52c41a' }}></Badge></h2>
      <Table columns={columns} dataSource={alluserList} onChange={onChange} rowKey="id" />
    </Col>
  );
};

export default UserList;
