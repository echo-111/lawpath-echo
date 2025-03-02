"use client";

import ValidateForm from "./components/ValidateForm";
import { withApollo } from "./services/gql-client";

const Home = () => <ValidateForm />;

export default withApollo(Home);
