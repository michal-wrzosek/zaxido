import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Listing, ListingDocument } from './listing.schema';
import {
  ListingUpdateId,
  ListingUpdateIdDocument,
} from './listing-update-id.schema';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
    @InjectModel(ListingUpdateId.name)
    private listingUpdateIdModel: Model<ListingUpdateIdDocument>
  ) {}

  async findAll(): Promise<Listing[]> {
    const lastUpdateId = await this.listingUpdateIdModel
      .findOne({
        finished: true,
      })
      .sort({ id: 'desc' })
      .exec();

    return this.listingModel
      .find({ sentiment: 'positive', updateId: lastUpdateId.id })
      .exec();
  }
}
