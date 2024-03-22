import React, { useEffect, useState } from 'react';
import { Form, Card, Input, Button, Col, message, Select } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddSubCategory = () => {
    const data = useSelector((state) => state.user.value);
    const [loading, setLoading] = useState(false);
    const [viewCategoryList, setViewCategoryList] = useState([]);
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/product/viewcategory');
            const modifiedData = response.data.map(item => ({
                label: item.name,
                value: item._id
            }));
            setViewCategoryList(modifiedData);

            // Set initial category ID value
            if (modifiedData.length > 0) {
                setCategoryId(modifiedData[0].value); // Assuming the first category is the initial value
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Failed to fetch data. Please try again.', 0.8);
        }
    };

    const handleChange = (value) => {
        setCategoryId(value);
    };

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await axios.post('http://localhost:8000/api/v1/product/subcategory', {
                name: values.name,
                categoryId: categoryId
            });
            message.success('Category added successfully!', 0.5); // Set duration to 0.5 seconds
            form.resetFields(); // Reset the form fields
        } catch (error) {
            console.error('Error:', error);
            message.error('Failed to add category. Please try again.', 0.5); // Set duration to 0.5 seconds
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
            <Card title="Add Sub-Category" bordered={false} style={{ width: 500 }}>
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
                        categoryId: categoryId // Set initial value for categoryId
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Sub-Category Name"
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
                    <Form.Item label="Select Category" name="categoryId">
                        <Select
                            style={{ width: 200 }}
                            onChange={handleChange}
                            options={viewCategoryList.map(category => ({ ...category, key: category.value }))}
                        />
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
}

export default AddSubCategory;
