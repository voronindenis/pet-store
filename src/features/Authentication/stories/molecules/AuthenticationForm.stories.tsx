import React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta, StoryFn } from '@storybook/react';

import { AuthenticationForm as AuthenticationFormComponent, IAuthenticationFormProps } from '../../molecules';

export default {
  title: 'Features/Authentication/Molecules',
  component: AuthenticationFormComponent,
} as Meta<IAuthenticationFormProps>;

const Template: StoryFn<IAuthenticationFormProps> = (args) => <AuthenticationFormComponent {...args} />;

export const AuthenticationForm = Template.bind({});
AuthenticationForm.args = {
  createUser: action('createUser'),
  login: (username, password) => console.log('Login user:', username, password),
};
