import { Author } from "../models/author";
import { authors as Authors } from '../database'

interface CreateUserDTO {
  id: string;
  name: string;
  username: string;
}

export class CreateAuthorService {
  private authors: typeof Authors;
  
  constructor() {
    this.authors = Authors;
  }

  async execute(data: CreateUserDTO): Promise<Author>{
    const { id, name, username } = data

    const userAlreadyExists = await this.authors.findUnique({ where: { id }});

    if (userAlreadyExists) throw new Error(`User already exists`);

    const author = await this.authors.create({
      data: {
        id,
        name,
        username
      }
    })

    return author
  }
}