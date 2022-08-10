import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'listings-update-id' })
export class ListingUpdateId {
  @Prop()
  id!: number;

  @Prop()
  finished!: boolean;
}

export type ListingUpdateIdDocument = ListingUpdateId & Document;
export const ListingUpdateIdSchema =
  SchemaFactory.createForClass(ListingUpdateId);
