import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
  mutation sendMessage($name: String!, $email: String!, $message: String!) {
    createContact(name: $name, email: $email, message: $message) {
      ok
      contact {
        name
        email
        message
      }
    }
  }
`;

export const SEND_HIGH_FIVE = gql`
  mutation sendCount($id: ID!) {
    updateHighFiveCount(id: $id) {
      ok
      home {
        id
        highFiveCount
      }
    }
  }
`;
