import React from 'react'
import { Card, Flex,Button, Checkbox, Form, Input,Alert } from 'antd';
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const ChangePassword = () => {
  let { emailToken } = useParams();
  let navigate = useNavigate()
  const boxStyle = {
    width: '100wh',
    height: '97vh',
  };

  const onFinish = async(values) => {
      let data = {
        password:values.password,
        token: emailToken
      }
      const userData = await axios.post('http://localhost:8000/api/v1/auth/changepassword', data)

      console.log('Success:', userData);
      if(userData){
        navigate('/login')
      }
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  return (
    <>
        <Flex style={boxStyle} justify='center' align='center'>
            <Card title="Set Password" bordered={false} style={{ width: 400 }}>
            <Form name="basic" labelCol={{ span: 6, }} wrapperCol={{ span: 18, }}
            style={{  maxWidth: 800, }} initialValues={{ remember: true, }} onFinish={onFinish}
            onFinishFailed={onFinishFailed} autoComplete="off"
            >

            <Form.Item label="Password" name="password"
            rules={[
                {
                required: true,
                message: 'Please input your Password!',
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

export default ChangePassword