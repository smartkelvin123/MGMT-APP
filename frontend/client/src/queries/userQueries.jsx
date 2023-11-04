import { gql } from "@apollo/client";

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      // Add other user fields you need
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      email
      // Add other user fields you need
    }
  }
`;
