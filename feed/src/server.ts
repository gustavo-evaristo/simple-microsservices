import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { FeedResolver } from "./resolvers/feed.resolvers";
import { PubSubEvents } from "./events";

const pubsubEvents = new PubSubEvents();

const port = process.env.PORT || 3003;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [FeedResolver],
    emitSchemaFile: path.join(__dirname, "..", "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  pubsubEvents.listen();
  
  const { url } = await server.listen(port);

  console.log(`server running on ${url}`);
};

main();
