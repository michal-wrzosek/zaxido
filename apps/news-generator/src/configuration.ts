const configuration = {
  REDDIT_APP_ID: process.env.REDDIT_APP_ID,
  REDDIT_APP_SECRET: process.env.REDDIT_APP_SECRET,
  MONGODB_USERNAME: process.env.MONGODB_USERNAME,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  MONGODB_DB: process.env.MONGODB_DB,
  MONGODB_DOMAIN: process.env.MONGODB_DOMAIN,
  OPENAI_TOKEN: process.env.OPENAI_TOKEN,
  NODE_ENV: process.env.NODE_ENV ?? 'production',
  TEMP_DIR_PATH: process.env.TEMP_DIR_PATH,
};

if (
  !configuration.REDDIT_APP_ID ||
  !configuration.REDDIT_APP_SECRET ||
  !configuration.MONGODB_USERNAME ||
  !configuration.MONGODB_PASSWORD ||
  !configuration.MONGODB_DB ||
  !configuration.MONGODB_DOMAIN ||
  !configuration.OPENAI_TOKEN ||
  !configuration.TEMP_DIR_PATH
)
  throw new Error('Missing environment variables!');

export const {
  REDDIT_APP_ID,
  REDDIT_APP_SECRET,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB,
  MONGODB_DOMAIN,
  OPENAI_TOKEN,
  NODE_ENV,
  TEMP_DIR_PATH,
} = configuration;
