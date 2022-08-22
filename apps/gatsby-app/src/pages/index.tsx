import React from "react"
import styled, { ThemeProvider } from "styled-components"
import { graphql } from "gatsby"
import { GatsbyListing } from "@zaxido/types-common"
import {
  ComponentLibraryContextProvider,
  ComponentLibraryContextValue,
  ListingList,
} from "@zaxido/component-library"

import { lightTheme } from "../theme/theme"
import { GlobalStyles } from "../theme/global-styles"

const componentLibraryContextValue: ComponentLibraryContextValue = {
  appType: "gatsby",
}

const StyledList = styled.div`
  padding: 20px;
  background: #c1c8e4;
`

export function Index(props) {
  const listings = props.data.allMongodbZaxido0Listings.edges.map(
    ({ node }) => node as GatsbyListing
  )

  return (
    <ComponentLibraryContextProvider
      contextValue={componentLibraryContextValue}
    >
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <StyledList>
          <ListingList listings={listings} />
        </StyledList>
      </ThemeProvider>
    </ComponentLibraryContextProvider>
  )
}

export default Index

export const pageQuery = graphql`
  query Listings {
    allMongodbZaxido0Listings {
      edges {
        node {
          author
          createdUTC
          downs
          isNSFW
          isVideo
          kind
          numberOfComments
          permalink
          redditId
          subreddit
          thumbnail
          thumbnailGatsby {
            childImageSharp {
              fluid(maxWidth: 140, maxHeight: 140) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          thumbnailHeight
          thumbnailWidth
          previewsSourceUrlGatsby {
            childImageSharp {
              fluid(maxWidth: 140, maxHeight: 140) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          title
          ups
          url
        }
      }
    }
  }
`
