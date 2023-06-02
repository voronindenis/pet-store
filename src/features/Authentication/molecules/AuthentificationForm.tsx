import React, { useState } from 'react';

import { Form, Input, Button, Row, Col, Typography } from 'antd';

import { IUser } from '~/api';

interface IFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username: string;
  password: string;
}

export interface IAuthenticationFormProps {
  createUser: (user: IUser) => void;
  login: (username?: string, password?: string) => void;
}

export const AuthenticationForm: React.FC<IAuthenticationFormProps> = (props) => {
  const { createUser, login } = props;
  const [isSignup, setIsSignup] = useState(false);

  const onFinish = (values: IFormValues) => {
    isSignup
      ? createUser({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          username: values.username,
          password: values.password,
        })
      : login(values.username, values.password);
  };

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <Row
      justify='center'
      align='middle'
      style={{ minHeight: '100vh' }}
    >
      <Col span={8}>
        <Typography.Title
          level={2}
          data-testid='authentication-title'
        >
          Pet Store
        </Typography.Title>
        <Form
          name='authentication'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          data-testid='authentication-form'
        >
          {isSignup && (
            <>
              <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Please input your First Name!' }]}
              >
                <Input
                  data-testid='firstName-input'
                  placeholder='First Name'
                />
              </Form.Item>

              <Form.Item
                name='lastName'
                rules={[{ required: true, message: 'Please input your Last Name!' }]}
              >
                <Input
                  data-testid='lastName-input'
                  placeholder='Last Name'
                />
              </Form.Item>

              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input
                  data-testid='email-input'
                  placeholder='Email'
                />
              </Form.Item>

              <Form.Item
                name='phone'
                rules={[{ required: true, message: 'Please input your Phone Number!' }]}
              >
                <Input
                  data-testid='phone-input'
                  placeholder='Phone Number'
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              data-testid='username-input'
              placeholder='Username'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              data-testid='password-input'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item data-testid='submit-button-item'>
            <Button
              type='primary'
              htmlType='submit'
              data-testid='submit-button'
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
          </Form.Item>

          <Form.Item data-testid='toggle-form-button-item'>
            <Button
              type='link'
              onClick={toggleForm}
              data-testid='toggle-form-button'
            >
              {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default AuthenticationForm;
