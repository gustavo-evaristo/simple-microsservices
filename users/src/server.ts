import "reflect-metadata";
import path from "path";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolvers";

const port = process.env.PORT || 3000;

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.join(__dirname, "..", "schema.gql"),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen(port);

  console.log(`server running on ${url}`);
};

main();
