import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

const StyledApp = styled.div``

export function Index(props) {
  const listings = props.data.allMongodbGatsbyListings.edges
  console.log("listings", listings)
  return <StyledApp>Test</StyledApp>
}

export default Index

export const pageQuery = graphql`
  query MyQuery {
    allMongodbGatsbyListings {
      edges {
        node {
          id
        }
      }
    }
  }
`
