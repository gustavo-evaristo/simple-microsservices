import { users as Users } from '../database'
import { CreateFeedService } from './createFeedService';


interface CreateUserDTO {
  id: string;
  name: string;
  username: string;
}

export class CreateUserService {
  private users: typeof Users;
  private feed: CreateFeedService;
  
  constructor(){
    this.users = Users;
    this.feed = new CreateFeedService();
  }

  async execute(data: CreateUserDTO): Promise<void>{
    const { id, name, username } = data

    const userAlreadyExists = await this.users.findUnique({ where: { id }});

    if (userAlreadyExists) throw new Error(`User already exists`);

    const user = await this.users.create({
      data: {
        id,
        name,
        username
      }
    })

    await this.feed.execute({
      user_id: user.id
    })
  }
}