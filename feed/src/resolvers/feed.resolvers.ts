import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { feed } from '../database'
import { Feed } from "../models/feed";

@Resolver()
export class FeedResolver {
  
  @Query(() => [Feed])
  async getFeed() {
    return feed.findMany({ include: { users: true, posts: true }});
  }
}