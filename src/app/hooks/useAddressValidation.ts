"use client";

import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { getAddressQuery } from "../services/address-gql";
import STATE_NAMES from "../constants/stateNames";

interface Address {
    location: string;
    postcode: string;
    state: string;
  };

export function useAddressValidation() {
  const [postcode, setPostcode] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [fetchAddress, { loading }] = useLazyQuery(getAddressQuery);

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const validateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();

    //delete unexpect space in input value
    const trimmedPostcode = postcode.trim(); 
    const trimmedSuburb = suburb.trim().replace(/\s{2,}/g, " ");

    try {
      const { data, error } = await fetchAddress({ variables: { q: trimmedSuburb, state } });

      if (!data || !data.address || error) {
        setError("Invalid address details.");
        return;
      }

      const validAddresses: Address[] = data.address;

      // Get full state name
      const stateFullName = STATE_NAMES[state] || state;

      // Suburb validation
      const suburbInState = validAddresses.some(
        (loc) => loc.location.toUpperCase() === trimmedSuburb.toUpperCase() && loc.state === state
      );
      if (!suburbInState) {
        setError(`The suburb ${trimmedSuburb} does not exist in the state ${stateFullName} (${state}).`);
        return;
      }

      // Postcode validation
      const match = validAddresses.find(
        (loc) => loc.postcode.toString() === trimmedPostcode && loc.state === state && loc.location.toUpperCase() === trimmedSuburb.toUpperCase()
      );
      if (!match) {
        setError(`The postcode ${trimmedPostcode} does not match the suburb ${trimmedSuburb}.`);
        return;
      }

      setSuccess("The postcode, suburb, and state input are valid.");
    } catch {
      setError("Failed to validate address.");
    }
  };

  return {
    postcode,
    setPostcode,
    suburb,
    setSuburb,
    state,
    setState,
    error,
    success,
    loading,
    validateAddress,
    resetMessages,
  };
}
