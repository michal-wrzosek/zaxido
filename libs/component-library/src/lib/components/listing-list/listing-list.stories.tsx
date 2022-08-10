import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListingList } from './listing-list';
import { exampleListings } from './listing-list.mocks';

export default {
  component: ListingList,
  title: 'ListingList',
} as ComponentMeta<typeof ListingList>;

const Template: ComponentStory<typeof ListingList> = () => (
  <ListingList listings={exampleListings} />
);

export const Primary = Template.bind({});
Primary.args = {};
