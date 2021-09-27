import { Form, Input, Button, Checkbox, message } from 'antd';
import styles from "./RegisterForm.module.css";
import axios from "axios"
import { useHistory } from 'react-router';


export const RegisterForm = () => {

    const history = useHistory();

    const info = (m) => {
        message.info(m);
      };

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        try {
            let url = 'http://localhost:9001/api/user/v1/login'
            await axios.post(url, {
                mail: values.username,
                pwd: values.password
            })
            info("succeed")
            history.push('/login/')
        } catch (error) {
            info("error")
        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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

            <Form.Item
                label="Confirm Password"
                name="confirmpassword"
                hasFeedback
                rules={[{ required: true, message: 'Please confirm your password!' },
                (({ getFieldValue }) => ({
                    validator(_,value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve()
                        }
                        return Promise.reject("password not same")
                    }
                }))
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};