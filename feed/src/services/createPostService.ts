import { posts, posts as Posts, users as Users } from '../database'
import { CreateFeedService } from './createFeedService';

interface CreatePostDTO {
  name: string;
  user_id: string;
}

export class CreatePostService {
  private posts: typeof Posts;
  private users: typeof Users;
  private feed: CreateFeedService;
  
  constructor(){
    this.posts = Posts;
    this.users = Users;
    this.feed = new CreateFeedService();
  }

  async execute(data: CreatePostDTO): Promise<void>{
    const { name, user_id } = data

    const userAlreadyExists = await this.users.findUnique({ where: { id: user_id }});

    if (!userAlreadyExists) throw new Error(`User already exists`);

    const post = await this.posts.create({
      data: {
        name,
        user_id
      }
    })

    await this.feed.execute({
      post_id: post.id
    })
  }
}