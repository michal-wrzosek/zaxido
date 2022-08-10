import { ListingList } from '@zaxido/component-library';

import { useListingsQuery } from '../../graphql/graphql.generated';

export const MainPage = () => {
  const { data } = useListingsQuery();

  return <ListingList listings={data?.listings ?? []} />;
};
