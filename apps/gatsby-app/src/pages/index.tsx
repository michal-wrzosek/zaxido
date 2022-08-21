import React from "react"
import { ThemeProvider } from "styled-components"
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

export function Index(props) {
  const listings = props.data.allMongodbZaxido0Listings.edges.map(
    ({ node }) => node as GatsbyListing
  )
  console.log("listings", listings)
  return (
    <ComponentLibraryContextProvider
      contextValue={componentLibraryContextValue}
    >
      <ThemeProvider theme={lightTheme}>
        <GlobalStyles />
        <div>
          <ListingList listings={listings} />
        </div>
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
