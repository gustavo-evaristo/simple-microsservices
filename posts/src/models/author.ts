import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Field()
  name: string

  @Field()
  username: string

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}