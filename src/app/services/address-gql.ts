import { gql } from '@apollo/client';

export const getAddressQuery = gql`
  query getAddress($q: String!, $state: String) {
    address(q: $q, state: $state) {
      id
      location
      postcode
      state
    }
  }
`;