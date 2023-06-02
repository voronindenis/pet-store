import React from 'react';

import { StoryFn, Meta } from '@storybook/react';

import { Pets as PetsComponent } from '../../organsims';

export default {
  title: 'Features/Pets/organisms',
  component: PetsComponent,
} as Meta;

const Template: StoryFn = (args) => <PetsComponent {...args} />;

export const Pets = Template.bind({});
Pets.args = {};
