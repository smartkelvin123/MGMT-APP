import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./component/header";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import Project from "./pages/projectPage";
import Login from "./pages/loginpage/login";
import Register from "./pages/registerpage/register";

import PrivateRoute from "./component/privateRoutes";
import { AuthProvider } from "./component/AuthContext";

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
              <Route path="/" element={<Navigate to="/login" />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <PrivateRoute>
                    <Project />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
