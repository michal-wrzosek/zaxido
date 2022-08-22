import { ListingList } from '@zaxido/component-library';
import styled from 'styled-components';

import { useListingsQuery } from '../../graphql/graphql.generated';

const StyledList = styled.div`
  padding: 20px;
  background: #c1c8e4;
`;

export const MainPage = () => {
  const { data } = useListingsQuery();

  return (
    <StyledList>
      <ListingList listings={data?.listings ?? []} />;
    </StyledList>
  );
};
