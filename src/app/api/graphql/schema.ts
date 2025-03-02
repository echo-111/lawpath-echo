
export const typeDefs = `#graphql
type Query {
  address(q: String!, state: String): [Locality]
}

type Locality {
  id: Int
  location: String
  postcode: Int
  state: String
}
`;