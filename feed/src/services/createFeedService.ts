import { feed as Feed } from '../database'

interface CreateFeedDTO {
  user_id?: string;
  post_id?: string;
}

export class CreateFeedService {
  private feed: typeof Feed;
  
  constructor(){
    this.feed = Feed;
  }

  async execute(data: CreateFeedDTO): Promise<void>{
    const { user_id, post_id } = data;

    await this.feed.create({
      data: {
        user_id,
        post_id
      }
    })
  }
}