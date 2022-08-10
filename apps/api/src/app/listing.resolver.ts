import { Query, Resolver } from '@nestjs/graphql';

import { ListingType } from './listing.dto';
import { ListingService } from './listing.service';

@Resolver('Listing')
export class ListingResolver {
  constructor(private readonly listingService: ListingService) {}

  @Query(() => [ListingType])
  async listings() {
    return this.listingService.findAll();
  }
}
