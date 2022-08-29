import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreatePostInput } from "../inputs/create-post-input";
import { authors, posts } from '../database'
import { Post } from "../models/posts";

@Resolver()
export class PostResolver {
  
  @Query(() => [Post])
  async getPosts() {
    return posts.findMany({ include: { author: true }});
  }
  
  @Mutation(() => Post)
  async createPost(@Arg('data') data: CreatePostInput) {

    const { author_id } = data;

    const authorExists = await authors.findUnique({
      where: { id: author_id }
    })

    if (!authorExists) throw new Error("Author not exists");

    return posts.create({ data, include: { author: true }});
  }
}