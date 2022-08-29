import { ObjectType, Field, ID } from 'type-graphql'
import { User } from './user';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  user_id: string;

  @Field()
  user: User;
}