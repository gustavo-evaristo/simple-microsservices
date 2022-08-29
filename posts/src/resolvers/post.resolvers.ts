import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CreatePostInput } from "../inputs/create-post-input";
import { authors, posts } from '../database'
import { Post } from "../models/posts";
import { PubSubService } from "../services/pubsub";


@Resolver()
export class PostResolver {
  private pubsubService: PubSubService;

  constructor() {
    this.pubsubService = new PubSubService();
  }
  
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

    const post = await posts.create({ data, include: { author: true }});

    this.pubsubService.publish('newPostRegistered', post);

    return post;
  }
}