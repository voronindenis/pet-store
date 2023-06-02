import React from 'react';

import { Meta, StoryFn } from '@storybook/react';
import { Typography } from 'antd';

import { AuthenticationProvider as AuthenticationProviderComponent } from '../../organisms';

export default {
  title: 'Features/Authentication/organisms',
  component: AuthenticationProviderComponent,
} as Meta;

const Template: StoryFn = (args) => (
  <AuthenticationProviderComponent>
    <Typography.Title>You are logged in!</Typography.Title>
  </AuthenticationProviderComponent>
);

export const AuthenticationProvider = Template.bind({});
