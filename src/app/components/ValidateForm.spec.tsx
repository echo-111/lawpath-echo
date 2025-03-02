import { render, screen, fireEvent } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import ValidateForm from "./ValidateForm";
import { getAddressQuery } from "../services/address-gql";

describe("ValidateForm Component", () => {

  test("renders ValidateForm with inputs and button", () => {
    const mocks = [
      {
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Broadway',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [{
              id: '1',
              location: 'Broadway',
              postcode: '2001',
              state: 'NSW',
            }],
          },
        },
      },
    ]
    render(
      <MockedProvider mocks={mocks}>
        <ValidateForm />
      </MockedProvider>
    );

    expect(screen.getByLabelText(/Postcode/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Suburb/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Validate/i })).toBeInTheDocument();
  });

  test("trim space in suburb and postcode", async () => {
    const mock = [
      {
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Broadway',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [{
              id: '1',
              location: 'Broadway',
              postcode: '2001',
              state: 'NSW',
            }],
          },
        },
      },
    ]

    render(<MockedProvider mocks={mock}>
      <ValidateForm />
    </MockedProvider>)

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i);

    fireEvent.change(postcodeInput, { target: { value: '  2001  ' } });
    fireEvent.change(suburbInput, { target: { value: '  Broadway  ' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));

    expect(await screen.findByText("The postcode, suburb, and state input are valid.")).toBeInTheDocument();
  });

  test("displays error when postcode does not match suburb", async () => {
    const mocks = [
      {
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Broadway',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [{
              id: '1',
              location: 'Broadway',
              postcode: '2001',
              state: 'NSW',
            }],
          },
        },
      },
    ]

    render(<MockedProvider mocks={mocks}>
      <ValidateForm />
    </MockedProvider>);

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i);

    fireEvent.change(postcodeInput, { target: { value: '2000' } });
    fireEvent.change(suburbInput, { target: { value: 'Broadway' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));

    expect(await screen.findByText("The postcode 2000 does not match the suburb Broadway.")).toBeInTheDocument();
  });

  test("displays error when response suburb does not match with input suburb", async () => {
    const mocks = [
      {
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Bro',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [
              {
                id: '1',
                location: 'Broadway',
                postcode: '2001',
                state: 'NSW',
              },
            ],
          },
        },
      },
    ]

    render(<MockedProvider mocks={mocks}>
      <ValidateForm />
    </MockedProvider>);

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i);

    fireEvent.change(postcodeInput, { target: { value: '2001' } });
    fireEvent.change(suburbInput, { target: { value: 'Bro' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));

    expect(await screen.findByText("The suburb Bro does not exist in the state New South Wales (NSW).")).toBeInTheDocument();
  });

  test("displays error when response list is empty", async () => {
    const mocks = [
      {
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Bro',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [
              {
                id: '1',
                location: 'Broadway',
                postcode: '2001',
                state: 'NSW',
              },
            ],
          },
        },
      },
    ]

    render(<MockedProvider mocks={mocks}>
      <ValidateForm />
    </MockedProvider>);

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i);

    fireEvent.change(postcodeInput, { target: { value: '2001' } });
    fireEvent.change(suburbInput, { target: { value: 'Bro' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));

    expect(await screen.findByText("The suburb Bro does not exist in the state New South Wales (NSW).")).toBeInTheDocument();
  });

  test("displays error when response list is empty", async () => {
    const mocks = [
      {
        request: {
          query: getAddressQuery,
          variables: {  
            q: 'Broadway',
            state: 'NSW',
          },
        },
        result: {
          errors: [new Error("Invalid address details.")],
        },
      },
    ];

    render(<MockedProvider mocks={mocks}>
      <ValidateForm />
    </MockedProvider>);

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i); 

    fireEvent.change(postcodeInput, { target: { value: '2001' } });
    fireEvent.change(suburbInput, { target: { value: 'Broadway' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));  

    expect(await screen.findByText("Invalid address details.")).toBeInTheDocument();
  });

  test("displays success message when all inputs are valid", async () => {
    const mocks = [
      {
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Broadway',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [{
              id: '1',
              location: 'Broadway',
              postcode: '2001',
              state: 'NSW',
            }],
          },
        },
      },
    ];

    render(<MockedProvider mocks={mocks}>
      <ValidateForm />
    </MockedProvider>);

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i);

    fireEvent.change(postcodeInput, { target: { value: '2001' } });
    fireEvent.change(suburbInput, { target: { value: 'Broadway' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));

    expect(await screen.findByText("The postcode, suburb, and state input are valid.")).toBeInTheDocument();
  });

  test("disables button when loading", async () => {
    const mocks = [
      {
        delay: 60,
        request: {
          query: getAddressQuery,
          variables: {
            q: 'Broadway',
            state: 'NSW',
          },
        },
        result: {
          data: {
            address: [{
              id: '1',
              location: 'Broadway',
              postcode: '2001',
              state: 'NSW',
            }],
          },
        },
      },
    ];

    render(<MockedProvider mocks={mocks}>
      <ValidateForm />
    </MockedProvider>);

    const postcodeInput = screen.getByLabelText(/Postcode/i);
    const suburbInput = screen.getByLabelText(/Suburb/i);
    const stateInput = screen.getByLabelText(/State/i);

    fireEvent.change(postcodeInput, { target: { value: '2001' } });
    fireEvent.change(suburbInput, { target: { value: 'Broadway' } });
    fireEvent.change(stateInput, { target: { value: 'NSW' } });

    fireEvent.submit(screen.getByRole("button", { name: /Validate/i }));

    expect(await screen.findByText("Validating...")).toBeInTheDocument();
  });
});

