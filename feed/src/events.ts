import { CreatePostService } from "./services/createPostService";
import { CreateUserService } from "./services/createUserService";
import { PubSubService } from "./services/pubsub";

export class PubSubEvents {
  private pubsubService: PubSubService;
  private createUserService: CreateUserService;
  private createPostService: CreatePostService;

  constructor() {
    this.pubsubService = new PubSubService();
    this.createUserService = new CreateUserService();
    this.createPostService = new CreatePostService();
  }

  listen() {
    this.newUserRegistered();
    this.newPostRegistered();
  }

  private async newUserRegistered() {
    this.pubsubService.subscribe('newUserRegistered.sub-feed', async (message) => {

      const { id, name, username } = JSON.parse(message.data.toString());
  
      await this.createUserService.execute({ id, name, username });
    })
  }

  private async newPostRegistered() {
    this.pubsubService.subscribe('newPostRegistered.sub-feed', async (message) => {

      const { author_id, name } = JSON.parse(message.data.toString());
  
      await this.createPostService.execute({ name, user_id: author_id });
    })
  }
}