import { AddressApiError } from '../../errors/address-api-error';

interface Locality {
  id: number;
  location: string;
  postcode: number;
  state: string;
}

interface LocalityResponse {
  localities: {
    locality: Locality[];
  };
}

export const getAddress = async (q: string, state: string) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const response = await fetch(`${API_URL}/search.json?q=${encodeURIComponent(q)}&state=${encodeURIComponent(state)}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
    },
  });

  if (response.ok) {
    const data = await response.json() as LocalityResponse;

    if (!data?.localities?.locality) {
      return []
    }

    if (Array.isArray(data.localities.locality)) {

      return data.localities.locality as Locality[];

    } else {

      return [data.localities.locality as Locality];

    }
  }

  throw new AddressApiError(response.status, `Http error: ${response.status}`);
}