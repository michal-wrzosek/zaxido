import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class ListingPreviewItem {
  url: string;
  width: number;
  height: number;
}

class ListingPreview {
  source: ListingPreviewItem;
  resolutions: ListingPreviewItem[];
}

export type Sentiment = 'positive' | 'neutral' | 'negative';
export type ListingKind = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

@Schema({ collection: 'listings' })
export class Listing {
  @Prop()
  id!: string;

  @Prop()
  kind!: ListingKind;

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
  thumbnail?: string;

  @Prop()
  thumbnailWidth?: number;

  @Prop()
  thumbnailHeight?: number;

  @Prop()
  previews!: ListingPreview[];

  @Prop()
  isVideo!: boolean;

  @Prop()
  isNSFW!: boolean;

  @Prop()
  ups!: number;

  @Prop()
  downs!: number;

  @Prop()
  sentiment!: Sentiment;

  @Prop()
  updateId!: number;
}

export type ListingDocument = Listing & Document;
export const ListingSchema = SchemaFactory.createForClass(Listing);
