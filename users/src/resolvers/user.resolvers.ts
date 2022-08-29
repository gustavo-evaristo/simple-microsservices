import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../models/user";
import { CreateUserInput } from "../inputs/create-user-input";
import { users } from "../database";
import { PubSubService } from "../services/pubsub";

@Resolver()
export class UserResolver {
  private pubsubService: PubSubService;

  constructor() {
    this.pubsubService = new PubSubService();
  }

  @Query(() => [User])
  async getUsers() {
    return users.findMany();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUserInput) {
    const { username } = data;

    const userAlreadyExists = await users.findUnique({
      where: { username },
    });

    if (userAlreadyExists) throw new Error("Username already exists");

    const userCreated = await users.create({ data });

    this.pubsubService.publish('newUserRegistered', userCreated);

    return userCreated;
  }
}
