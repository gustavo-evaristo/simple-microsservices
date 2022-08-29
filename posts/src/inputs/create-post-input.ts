import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  name: string;

  @Field()
  author_id: string;
}