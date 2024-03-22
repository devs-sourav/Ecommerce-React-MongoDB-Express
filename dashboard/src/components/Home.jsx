import React from 'react'
import { Col, Row,Menu } from 'antd';
import { AppstoreAddOutlined, TeamOutlined, GiftOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Users', 'sub1', <TeamOutlined />, [
    getItem('Users','/userlist' ),
    getItem('Merchant', '/merchant'),
  ]),
  getItem('Product', 'sub2', <AppstoreAddOutlined />, [
    getItem('Category', 'sub3', null, 
    [
      getItem('Add Category', '/addcategory'), 
      getItem('View Category', '/allcategory')
    ]),
    getItem('SubCategory', 'sub4', null, 
    [
      getItem('Add SubCategory', '/addsubcategory'), 
      getItem('View SubCategory', '/viewsubcategory')
    ]),
    getItem('Product', 'sub5', null, 
    [
      getItem('Add Product', '/addproduct'), 
      getItem('View Product', '/allproduct')
    ]),
  ]),
  getItem('Discount', 'sub6', <GiftOutlined />, [
    getItem('Add Discount', '15'),
    getItem('View Discount', '16'),
  ]),
  
];


const Home = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    console.log(e.key);
    navigate(e.key)
  };

  return (
    
    <>
      <Row>
        <Col  span={5}>
        <Menu
          onClick={onClick}
          style={{
            width: 256,
          }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          items={items}
        />
        </Col>
        <Col  span={19}>
          <Row>
            <Outlet/>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default Home