import { Form, Input, Button, Checkbox, message } from 'antd';
import styles from "./LoginForm.module.css";
import axios from "axios"
import { useHistory } from 'react-router';
import { login } from '../../redux/user/slice';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../redux/hooks';
import { useEffect } from 'react';



export const LoginForm = () => {
    
    const loading = useSelector(s => s.user.loading)
    const error = useSelector(s => s.user.error)
    const jwt = useSelector(s => s.user.token)

    const dispatch = useDispatch();
    const history = useHistory();

    const info = (m) => {
        message.info(m);
      };
    
    useEffect(() => {
        if (jwt !== null) {
            history.push('/');
        }
    },[jwt])
    const onFinish = (values:{username: string, password: string}) => {
        dispatch(login({
            mail: values.username,
            pwd: values.password
        }))
        
    };

    const onFinishFailed = (errorInfo: any) => {
    };
    
    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className={styles['register-form']}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="New Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading = {loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};