import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';

import { getUri } from '@zaxido/backend-common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  MONGODB_DB,
  MONGODB_DOMAIN,
  MONGODB_PASSWORD,
  MONGODB_USERNAME,
} from './configuration';
import { ListingModule } from './listing.module';

@Module({
  imports: [
    ListingModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(
      getUri({
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD,
        dbName: MONGODB_DB,
        domain: MONGODB_DOMAIN,
      }),
      { dbName: MONGODB_DB }
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
