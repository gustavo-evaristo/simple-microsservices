import { ObjectType, Field, ID } from 'type-graphql'
import { Author } from './author';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  author_id: string;

  @Field()
  author: Author;
}