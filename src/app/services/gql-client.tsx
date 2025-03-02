import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export function withApollo<T extends Record<string, unknown>>(PageComponent: React.ComponentType<T>) {
  const WithApollo = (props: T) => (
    <ApolloProvider client={client}>
      <PageComponent {...props} />
    </ApolloProvider>
  );
  return WithApollo;
}