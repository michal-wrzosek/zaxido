import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType('ListingPreviewItem')
@InputType('ListingPreviewItemInput')
class ListingPreviewItem {
  @Field()
  url: string;

  @Field()
  width: number;

  @Field()
  height: number;
}

@ObjectType('ListingPreview')
@InputType('ListingPreviewInput')
class ListingPreview {
  @Field()
  source: ListingPreviewItem;

  @Field(() => [ListingPreviewItem])
  resolutions: ListingPreviewItem[];
}

@ObjectType('ListingType')
@InputType('ListingInputType')
export class ListingType {
  @Field()
  id: string;

  @Field()
  kind: 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

  @Field()
  title: string;

  @Field()
  subreddit: string;

  @Field()
  permalink: string;

  @Field()
  author: string;

  @Field()
  numberOfComments: number;

  @Field()
  url: string;

  @Field()
  createdUTC: number;

  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  thumbnailWidth: number;

  @Field({ nullable: true })
  thumbnailHeight: number;

  @Field(() => [ListingPreview])
  previews: ListingPreview[];

  @Field()
  isVideo: boolean;

  @Field()
  isNSFW: boolean;

  @Field()
  ups: number;

  @Field()
  downs: number;

  @Field()
  sentiment: 'positive' | 'neutral' | 'negative';

  @Field()
  updateId: number;
}
