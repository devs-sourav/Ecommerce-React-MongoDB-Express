import React from "react";
import { Button, Col, Form, Input } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const AddStore = () => {
    let userInfo = useSelector((state) => state.user.value);
    console.log(userInfo._id)
    const [form] = Form.useForm(); // Create a form instance

    const onFinish = async (values) => {
      try {
        console.log("Success:", values);
        const response = await axios.post("http://localhost:8000/api/v1/product/createstore", {
          storename: values.storename,
          tradenumber: values.tradenumber,
          voterid: values.voterid,
          ownerId: userInfo._id,
        });

        console.log(response.data.success);

        // Reset the form fields after successful submission
        form.resetFields();
      } catch (error) {
        console.error("Error:", error);
        // Handle error as needed (e.g., show error message)
      }
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <Col span={24}>
      <h2>Add Store</h2>
      <Form
        form={form} // Pass the form instance to the Form component
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
          label="Store Name"
          name="storename"
          rules={[
            {
              required: true,
              message: "Please input your store name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Trade Number"
          name="tradenumber"
          rules={[
            {
              required: true,
              message: "Please input your trade number!",
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Voter ID"
          name="voterid"
          rules={[
            {
              required: true,
              message: "Please input your voter id!",
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      </Col>
    );
}

export default AddStore;
