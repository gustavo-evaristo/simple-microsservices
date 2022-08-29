import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post.resolvers";
import { PubSubService } from "./services/pubsub";
import { CreateAuthorService } from "./services/createAuthorService";

const pubSubService = new PubSubService();
const createAuthorService = new CreateAuthorService();

const port = process.env.PORT || 3002;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [PostResolver],
    emitSchemaFile: path.join(__dirname, "..", "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(port);

  pubSubService.subscribe('newUserRegistered.sub-posts', async (message) => {
    const { id, name, username } = JSON.parse(message.data.toString());

   await createAuthorService.execute({
      id,
      name,
      username
    });
  });

  console.log(`server running on ${url}`);
};

main();
