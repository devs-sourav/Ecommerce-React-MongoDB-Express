import React from 'react'
import { Card, Flex,Button, Checkbox, Form, Input,Alert } from 'antd';
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const boxStyle = {
        width: '100wh',
        height: '97vh',
    };

    const onFinish = async(values) => {
        
        let data = {
            email:values.email,
            password:values.password
        }

        const logData = await axios.post('http://localhost:8000/api/v1/auth/login', data)

        
        if(logData.data.emailVerified){
            navigate('/')
        }

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


  return (
    <>
        <Flex style={boxStyle} justify='center' align='center'>
            <Card title="Login" bordered={false} style={{ width: 400 }}>
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
            label="Password"
            name="password"
            rules={[
                {
                required: true,
                message: 'Please input your password!',
                },
            ]}
            >
            <Input.Password />
            </Form.Item>

            <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
            wrapperCol={{
                offset: 8,
                span: 16,
            }}
            >
            <Button type="primary" htmlType="submit">
                Submit
            </Button><br/>

            </Form.Item>
            </Form>

                <Link to="/forgetpassword"><Alert message="Forget Password" type="info" showIcon /></Link>
            
            </Card>

        </Flex>
    </>
  )
}

export default Login