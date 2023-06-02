import React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import { PetCards, IPetCards } from '../../molecules';

export default {
  title: 'Features/Pets/molecules/PetCards',
  component: PetCards,
} as Meta<IPetCards>;

const Template: StoryFn<IPetCards> = (args) => <PetCards {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
  data: [],
};

export const WithData = Template.bind({});
WithData.args = {
  isLoading: false,
  data: [
    { id: 1, name: 'Dog', status: 'available', category: { id: 1, name: 'Animals' }, photoUrls: [], tags: [] },
    { id: 2, name: 'Cat', status: 'sold', category: { id: 2, name: 'Animals' }, photoUrls: [], tags: [] },
  ],
};
