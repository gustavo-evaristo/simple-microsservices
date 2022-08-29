import { ObjectType, Field, ID } from 'type-graphql'
import { User } from './user';
import { Post } from './posts';

@ObjectType()
export class Feed {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  user_id: string | null;

  @Field({ nullable: true })
  users: User | null;

  @Field({ nullable: true })
  post_id: string | null;

  @Field({ nullable: true })
  posts: Post | null;
}