import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./component/header";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Project from "./pages/projectPage";
import Login from "./pages/login";
import Register from "./pages/register";
import PrivateRoute from "./component/privateRoutes";
import {AuthProvider} from "./component/AuthContext"

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
  uri: "http://localhost:5000/graphql",
  cache: cache,
});

function App() {
  return (
    <ApolloProvider client={client}>
        <AuthProvider>
      <div className="container">
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:id" element={<Project />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
