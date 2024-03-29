import React from 'react'
import { Card, Flex,Button, Checkbox, Form, Input,Alert } from 'antd';
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";

const ForgotPassword = () => {

    const navigate = useNavigate();

    const boxStyle = {
        width: '100wh',
        height: '97vh',
    };

    const onFinish = async(values) => {
        
        let data = {
            email:values.email
        }
        const userData = await axios.post('http://localhost:8000/api/v1/auth/forgetpassword', data)

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




  return (
    <>
        <Flex style={boxStyle} justify='center' align='center'>
            <Card title="Check email for otp" bordered={false} style={{ width: 400 }}>
            <Form name="basic" labelCol={{ span: 6, }} wrapperCol={{ span: 18, }}
            style={{  maxWidth: 800, }} initialValues={{ remember: true, }} onFinish={onFinish}
            onFinishFailed={onFinishFailed} autoComplete="off"
            >

            <Form.Item label="Email" name="email"
            rules={[
                {
                required: true,
                message: 'Please input your email!',
                },
            ]} >
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
            </Card>

        </Flex>
    </>
  )
}

export default ForgotPassword