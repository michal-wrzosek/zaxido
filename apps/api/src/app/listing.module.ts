import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ListingService } from './listing.service';
import { ListingResolver } from './listing.resolver';
import { Listing, ListingSchema } from './listing.schema';
import {
  ListingUpdateId,
  ListingUpdateIdSchema,
} from './listing-update-id.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Listing.name, schema: ListingSchema }]),
    MongooseModule.forFeature([
      { name: ListingUpdateId.name, schema: ListingUpdateIdSchema },
    ]),
  ],
  providers: [ListingService, ListingResolver],
})
export class ListingModule {}
