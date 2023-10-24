import { gql } from "@apollo/client";

// Fetch data from the backend
const GET_CLIENTS = gql`
  {
    clients {
      id
      name
      email
      phone
    }
  }
`;
export { GET_CLIENTS };
