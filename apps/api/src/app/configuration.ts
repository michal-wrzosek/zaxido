const configuration = {
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DB: process.env.MONGODB_DB,
  MONGODB_DOMAIN: process.env.MONGODB_DOMAIN,
};

if (
  !configuration.MONGODB_USERNAME ||
  !configuration.MONGODB_PASSWORD ||
  !configuration.MONGODB_DB ||
  !configuration.MONGODB_DOMAIN
)
  throw new Error('Missing environment variables!');

export const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB,
  MONGODB_DOMAIN,
} = configuration;
