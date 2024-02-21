import React, { useState } from 'react';
import { Form, Card, Input, Button, Col, message } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddCategory = () => {
  const data = useSelector((state) => state.user.value);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      console.log('Success:', values);
      await axios.post('http://localhost:8000/api/v1/product/addcategory', {
        name: values.name,
        ownerId: data._id
      });
      message.success('Category added successfully!', 0.5); // Set duration to 2 seconds
      // Reset the form fields
      form.resetFields();
    } catch (error) {
      console.error('Error:', error);
      message.error('Failed to add category. Please try again.', 0.5); // Set duration to 2 seconds
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <Col span={24}>
      <Card title="Add Category" bordered={false} style={{ width: 400 }}>
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Category Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Category Name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default AddCategory;
