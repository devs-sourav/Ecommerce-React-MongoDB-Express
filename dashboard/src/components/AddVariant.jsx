import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Select } from "antd";
import axios from "axios";

const { Option } = Select;

const AddVariant = () => {
  const [form] = Form.useForm(); // Define form instance
  const [image, setImage] = useState({});
  const [imagePrev, setImagePrev] = useState("");
  const [prolist, setProlist] = useState([]);
  const [productId, setProductId] = useState("");

  const onFinish = async (values) => {
    console.log("Success:", values);
    console.log(image);
    try {
      let data = await axios.post(
        "http://localhost:8000/api/v1/product/variant",
        {
          name: values.name,
          vavatar: image,
          productId: productId,
          regularprice: values.regularprice,
          salesprice: values.salesprice,
          quantity: values.quantity,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);

      // Reset the form fields using the form instance
      form.resetFields();
      // Reset image state
      setImage({});
      setImagePrev("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    console.log("running");
    async function getData() {
      try {
        let data = await axios.get(
          "http://localhost:8000/api/v1/product/allproduct"
        );
        console.log(data.data);
        let arr = data.data.map((item) => ({
          label: item.name,
          value: item._id,
        }));
        setProlist(arr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    setImagePrev(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange2 = (value) => {
    setProductId(value);
  };

  return (
    <Col span={16}>
      <h2>Add Variant</h2>
      <Form
        form={form} // Pass form instance
        name="basic"
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        style={{
          maxWidth: 1000,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product"
          name="product"
          rules={[
            {
              required: true,
              message: "Please select a product",
            },
          ]}
        >
          <Select
            defaultValue="Select"
            style={{ width: 120 }}
            onChange={handleChange2}
          >
            {prolist.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Variant Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your variant name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Regular Price"
          name="regularprice"
          rules={[
            {
              required: true,
              message: "Please input your regular price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Sales Price"
          name="salesprice"
          rules={[
            {
              required: true,
              message: "Please input your sales price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[
            {
              required: true,
              message: "Please input your Quantity!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Input onChange={handleChange} type="file" />
          <img src={imagePrev} style={{ marginTop: "10px" }} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5, span: 19 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default AddVariant;
