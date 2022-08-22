import React from 'react';
import { RiArrowUpDownFill } from 'react-icons/ri';
import Img from 'gatsby-image';

import * as Types from './listing.types';
import * as Styles from './listing.styles';
import { useComponentLibraryContext } from '../../context/component-library-context';

export const Listing = ({ listing }: Types.ListingProps) => {
  const { appType } = useComponentLibraryContext();

  const {
    title,
    thumbnail,
    subreddit,
    author,
    url,
    numberOfComments,
    permalink,
    ups,
    downs,
  } = listing;

  const thumbnailGatsby =
    'thumbnailGatsby' in listing ? listing.thumbnailGatsby : undefined;

  const previewsSourceUrlGatsby =
    'previewsSourceUrlGatsby' in listing
      ? listing.previewsSourceUrlGatsby
      : undefined;

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
          <Styles.Author>Posted by {author}</Styles.Author>
        </Styles.TopBar>
        <Styles.Title href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </Styles.Title>
        {thumbnail && appType === 'cra' ? (
          <Styles.ThumbnailWrapper>
            <Styles.Thumbnail src={thumbnail} alt="thumbnail" />
          </Styles.ThumbnailWrapper>
        ) : previewsSourceUrlGatsby?.[0]?.childImageSharp &&
          appType === 'gatsby' ? (
          <Styles.ThumbnailWrapper>
            <Img
              fluid={previewsSourceUrlGatsby[0].childImageSharp.fluid}
              alt="thumbnail"
            />
          </Styles.ThumbnailWrapper>
        ) : thumbnailGatsby?.childImageSharp && appType === 'gatsby' ? (
          <Styles.ThumbnailWrapper>
            <Img
              fluid={thumbnailGatsby.childImageSharp.fluid}
              alt="thumbnail"
            />
          </Styles.ThumbnailWrapper>
        ) : null}
        <Styles.Comments
          href={`https://reddit.com${permalink}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {numberOfComments} comments
        </Styles.Comments>
      </Styles.MainPart>
    </Styles.Container>
  );
};
