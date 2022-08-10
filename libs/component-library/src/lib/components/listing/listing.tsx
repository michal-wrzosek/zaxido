import { FormattedMessage } from 'react-intl';
import { RiArrowUpDownFill } from 'react-icons/ri';

import * as Types from './listing.types';
import * as Styles from './listing.styles';
import { messages } from './listing.messages';

export const Listing = ({
  listing: {
    title,
    thumbnail,
    subreddit,
    author,
    url,
    numberOfComments,
    permalink,
    ups,
    downs,
  },
}: Types.ListingProps) => {
  return (
    <Styles.Container>
      <Styles.LeftSide>
        <div>{ups}</div>
        <RiArrowUpDownFill />
        <div>{downs}</div>
      </Styles.LeftSide>
      <Styles.MainPart>
        <Styles.TopBar>
          <Styles.Subreddit>r/{subreddit}</Styles.Subreddit>
          <Styles.Author>
            <FormattedMessage {...messages.postedBy} values={{ author }} />
          </Styles.Author>
        </Styles.TopBar>
        <Styles.Title href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </Styles.Title>
        {thumbnail ? <Styles.Thumbnail src={thumbnail} /> : null}
        <Styles.Comments
          href={`https://reddit.com${permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FormattedMessage
            {...messages.comments}
            values={{ numberOfComments }}
          />
        </Styles.Comments>
      </Styles.MainPart>
    </Styles.Container>
  );
};
