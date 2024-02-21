import React from 'react'
import { Card, Flex, Button, Checkbox, Form, Input,Alert } from 'antd';
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { activeUser } from '../slices/userSlices';


const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const boxStyle = {
        width: '100wh',
        height: '97vh',
    };

    const onFinish = async(values) => {
        
        let data = {
            email:'souravacharjee361@gmail.com',
            password:'1122334455'
        }

        const logData = await axios.post('http://localhost:8000/api/v1/auth/login', data)

        if(logData.data.role=="User"){
            console.log("You do not have permission for login");
        }else{
            if(logData.data.emailVerified){
                navigate('/');
                console.log("Done");
                localStorage.setItem("user",JSON.stringify(logData));
                console.log(logData);
                dispatch(activeUser(logData.data));
            }else{
                console.log("Email not verified");
            }
        }
        
    };
    const onFinishFailed = async(errorInfo) => {
        console.log('Failed:', errorInfo);
        let data = {
            email:'souravacharjee361@gmail.com',
            password:'1122334455'
        }

        

        const logData = await axios.post('http://localhost:8000/api/v1/auth/login', data)

        if(logData.data.role=="User"){
            console.log("You do not have permission for login");
        }else{
            if(logData.data.emailVerified){
                navigate('/');
                console.log("Done");
                localStorage.setItem("user",JSON.stringify(logData.data));
                dispatch(activeUser(logData.data));
            }else{
                console.log("Email not verified");
            }
        }

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
            }}>
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