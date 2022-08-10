import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DBListingKind, DBListingPreview, DBSentiment } from './db.types';

@Schema()
export class Listing {
  @Prop()
  id!: string;

  @Prop()
  kind!: DBListingKind;

  @Prop()
  title!: string;

  @Prop()
  subreddit!: string;

  @Prop()
  permalink!: string;

  @Prop()
  author!: string;

  @Prop()
  numberOfComments!: number;

  @Prop()
  url!: string;

  @Prop()
  createdUTC!: number;

  @Prop()
  thumbnail!: string;

  @Prop()
  thumbnailWidth!: number;

  @Prop()
  thumbnailHeight!: number;

  @Prop()
  previews!: DBListingPreview[];

  @Prop()
  isVideo!: boolean;

  @Prop()
  isNSFW!: boolean;

  @Prop()
  ups!: number;

  @Prop()
  downs!: number;

  @Prop()
  sentiment!: DBSentiment;

  @Prop()
  updateId!: number;
}

export type ListingDocument = Listing & Document;
export const CatSchema = SchemaFactory.createForClass(Listing);
