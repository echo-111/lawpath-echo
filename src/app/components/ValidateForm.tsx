"use client";

import InputField from "./InputField";
import SelectField from "./SelectField";
import { useAddressValidation } from "../hooks/useAddressValidation";
import STATE_NAMES from "../constants/stateNames";

const STATES = Object.keys(STATE_NAMES);

const ValidateForm = () => {
  const {
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
  } = useAddressValidation();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-center">
          Address Validator
        </h1>
        <form 
          onSubmit={validateAddress} 
          className="space-y-4"
        >
          <InputField
            label="Postcode"
            value={postcode}
            onChange={(e) => {
              setPostcode(e.target.value);
              resetMessages();
            }}
            required
          />
          <InputField
            label="Suburb"
            value={suburb}
            onChange={(e) => {
              setSuburb(e.target.value);
              resetMessages();
            }}
            required
          />
          <SelectField
            label="State"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              resetMessages();
            }}
            options={STATES}
            required
          />
          <button
            type="submit"
            className={`w-full text-white p-2 rounded transition-colors ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
            disabled={loading}
          >
            {loading ? "Validating..." : "Validate"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default ValidateForm;
