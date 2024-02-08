import React from 'react'
import { Card, Flex,Button, Checkbox, Form, Input } from 'antd';





const Registration = () => {
    const boxStyle = {
        width: '100wh',
        height: '97vh',
    };



    const onFinish = async(values) => {
        
        let data = {
            name: values.name,
            email:values.email,
            password:values.password
        }
        const userData = await axios.post('https://ecommerce-react-mongodb-express.onrender.com/api/v1/auth/registration', data)
        
        console.log('Success:', data);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


  return (
    <>
        <Flex style={boxStyle} justify='center' align='center'>
            <Card title="Registration" bordered={false} style={{ width: 400 }}>
            <Form name="basic" labelCol={{ span: 6, }} wrapperCol={{ span: 18, }}
            style={{  maxWidth: 800, }} initialValues={{ remember: true, }} onFinish={onFinish}
            onFinishFailed={onFinishFailed} autoComplete="off"
            >
            <Form.Item label="Full Name" name="name"
            rules={[
                {
                required: true,
                message: 'Please input your full name!',
                },
            ]} >
            <Input />
            </Form.Item>
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
            </Button>
            </Form.Item>
            </Form>
            </Card>

        </Flex>
    </>
  )
}

export default Registration