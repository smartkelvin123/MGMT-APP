import { gql } from "@apollo/client";

// add project

const ADD_PROJECT = gql`
  mutation addProject(
    $name: String!
    $description: String!
    $clientId: ID!
    $status: ProjectStatus
  ) {
    addProject(
      name: $name
      description: $description
      clientId: $clientId
      status: $status
    ) {
      id
      name
      description
      status
      client {
        id
        name
        email
        phone
      }
    }
  }
`;

// delete a project
const DELETE_PROJECT = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export { ADD_PROJECT, DELETE_PROJECT };
