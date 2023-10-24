import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./spinner";
import ClientRow from "./clientRow";
import { useQuery } from "@apollo/client";

const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return;

  <Spinner />;

  if (error) return <p>Error :(something is wrong)</p>;

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Clients;
