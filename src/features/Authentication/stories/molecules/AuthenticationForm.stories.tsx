import React from 'react';

import { action } from '@storybook/addon-actions';
import { StoryFn, Meta } from '@storybook/react';

import { AuthenticationForm as AuthenticationFormComponent, IAuthenticationForm } from '../../molecules';

export default {
  title: 'Features/Authentication/molecules',
  component: AuthenticationFormComponent,
  argTypes: {
    createUser: { action: 'created' },
    login: { action: 'logged in' },
  },
} as Meta;

const Template: StoryFn<IAuthenticationForm> = (args) => <AuthenticationFormComponent {...args} />;

export const AuthenticationForm = Template.bind({});
AuthenticationForm.args = {
  createUser: action('createUser'),
  login: action('login'),
};
