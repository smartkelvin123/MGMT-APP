import Header from "./component/header";
import Clients from "./component/client";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import AddClientModal from "./component/addClientModal";
import Project from "./component/project";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql", // backend server
  cache: cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <div className="container">
          <Header />
          <AddClientModal />
          <Project />
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
