import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Listing } from './listing';
import { exampleListing } from './listing.mocks';

export default {
  component: Listing,
  title: 'Listing',
} as ComponentMeta<typeof Listing>;

const Template: ComponentStory<typeof Listing> = () => (
  <Listing listing={exampleListing} />
);

export const Primary = Template.bind({});
Primary.args = {};
