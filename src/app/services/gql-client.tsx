import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
});

export function withApollo(PageComponent: any) {
  const WithApollo = (props: any) => (
    <ApolloProvider client={client}>
      <PageComponent {...props} />
    </ApolloProvider>
  );
  return WithApollo;
}