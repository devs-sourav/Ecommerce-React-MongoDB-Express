import React from 'react'
import { Card, Flex,Button, Form, Input } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'


const OtpPage = () => {

    let { email } = useParams();
    const navigate = useNavigate();

    const boxStyle = {
        width: '100wh',
        height: '97vh',
    };

    const onFinish = async(values) => {
        
        let dataOtp = {
            otp: values.otp,
            email:email
        }
        
        const userOtpData = await axios.post('http://localhost:8000/api/v1/auth/emailVerificationOtpMatch', dataOtp)
        
        console.log('Success:', userOtpData);
        navigate('/login')
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

        <Form.Item label="Otp" name="otp"
        rules={[
            {
            required: true,
            message: 'Please input your otp!',
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

export default OtpPage