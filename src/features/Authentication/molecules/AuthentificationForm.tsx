import React, { useState } from 'react';

import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { Form, Input, Button, Card } from 'antd';

import { IUser } from '~/api/Api';

interface IFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  username: string;
  password: string;
}

export interface IAuthenticationForm {
  createUser: (user: IUser) => void;
  login: (username: string, password: string) => void;
}

export const AuthenticationForm: React.FC<IAuthenticationForm> = (props) => {
  const { createUser, login } = props;

  const [isSignUp, setIsSignUp] = useState(false);

  const onFinish = (values: IFormValues) => {
    isSignUp
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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card
        title={isSignUp ? 'Sign Up' : 'Sign In'}
        style={{ width: 300 }}
      >
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {isSignUp && (
            <>
              <Form.Item
                name='firstName'
                rules={[{ required: true, message: 'Please input your First Name!' }]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      className='site-form-item-icon'
                      rev={undefined}
                    />
                  }
                  placeholder='First Name'
                  data-testid='first-name-input'
                />
              </Form.Item>

              <Form.Item
                name='lastName'
                rules={[{ required: true, message: 'Please input your Last Name!' }]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      className='site-form-item-icon'
                      rev={undefined}
                    />
                  }
                  placeholder='Last Name'
                  data-testid='last-name-input'
                />
              </Form.Item>

              <Form.Item
                name='email'
                rules={[{ required: true, message: 'Please input your Email!' }]}
              >
                <Input
                  prefix={
                    <MailOutlined
                      className='site-form-item-icon'
                      rev={undefined}
                    />
                  }
                  placeholder='Email'
                  data-testid='email-input'
                />
              </Form.Item>

              <Form.Item
                name='phone'
                rules={[{ required: true, message: 'Please input your Phone!' }]}
              >
                <Input
                  prefix={
                    <PhoneOutlined
                      className='site-form-item-icon'
                      rev={undefined}
                    />
                  }
                  placeholder='Phone'
                  data-testid='phone-input'
                />
              </Form.Item>
            </>
          )}

          <Form.Item
            name='username'
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={
                <UserOutlined
                  className='site-form-item-icon'
                  rev={undefined}
                />
              }
              placeholder='Username'
              data-testid='username-input'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={
                <LockOutlined
                  className='site-form-item-icon'
                  rev={undefined}
                />
              }
              type='password'
              placeholder='Password'
              data-testid='password-input'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
              data-testid={isSignUp ? 'sign-up-btn' : 'sign-in-btn'}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            Or{' '}
            <a
              onClick={() => setIsSignUp(!isSignUp)}
              data-testid='switch-form-link'
            >
              {isSignUp ? 'sign in instead' : 'sign up instead'}
            </a>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
