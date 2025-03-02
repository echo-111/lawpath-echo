import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { addressResolver } from './queries/address-resolver';
import { typeDefs } from './schema';

const resolvers = {
  Query: {
    address: addressResolver,
  },
};

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };