import { getAddress } from "./services/get-address";

interface Address {
  q: string;
  state: string;
}

export const addressResolver = async (parent: any, args: Address) => {
  const { q, state = '' } = args;
  const localities = await getAddress(q, state);
  return localities;
}