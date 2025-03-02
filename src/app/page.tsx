"use client";

import ValidateForm from "./components/ValidationForm";
import { withApollo } from "./services/gql-client";

const Home = () => <ValidateForm />;

export default withApollo(Home);
