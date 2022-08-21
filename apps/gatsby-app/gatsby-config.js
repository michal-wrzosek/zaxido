const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD
const MONGODB_DB = process.env.MONGODB_DB
const MONGODB_DOMAIN = process.env.MONGODB_DOMAIN

if (!MONGODB_USERNAME || !MONGODB_PASSWORD || !MONGODB_DB || !MONGODB_DOMAIN)
  throw new Error("Missing env variables!")

const mongodbConnectionString = `mongodb+srv://${MONGODB_USERNAME}:${encodeURIComponent(
  MONGODB_PASSWORD
)}@${MONGODB_DB}.${MONGODB_DOMAIN}`

module.exports = {
  siteMetadata: {
    title: `gatsby-app`,
    description: `This is a gatsby application created by Nx.`,
  },
  plugins: [
    "gatsby-plugin-styled-components",

    {
      resolve: "gatsby-plugin-svgr",
      options: {
        svgo: false,
        ref: true,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    {
      resolve: require.resolve(`@nrwl/gatsby/plugins/nx-gatsby-ext-plugin`),
      options: {
        path: __dirname,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-app`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "mongodbZaxido0Listings",
        imagePath: "thumbnail",
        name: "thumbnailGatsby",
      },
    },
    {
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: "mongodbZaxido0Listings",
        imagePath: "previews[].source.url",
        name: "previewsSourceUrlGatsby",
      },
    },
    {
      resolve: `gatsby-source-mongodb`,
      options: {
        dbName: MONGODB_DB,
        collection: ["listings"],
        connectionString: mongodbConnectionString,
        preserveObjectIds: true,
        extraParams: {
          w: "majority",
          retryWrites: true,
          preserveObjectIds: true,
        },
      },
    },
  ],
}
