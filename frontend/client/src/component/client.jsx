import React from "react";
import { gql, useQuery } from "@apollo/client";

// fetch data from backend
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

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(something is wrong)</p>;
  console.log("data", data);

  return <div>{!loading && !error && <h1>Clients</h1>}</div>;
};

export default Clients;
