import { gql } from "@apollo/client";

export const CREATE_SECTION = gql`
  mutation CreateSection(
    $entityId: ID!
    $elementType: SectionTypeEnum!
    $name: String
  ) {
    createOrUpdateSection(
      input: {
        attributes: {
          name: $name
          entityId: $entityId
          elementType: $elementType
        }
      }
    ) {
      id
      name
      order
      elements
      elementType
    }
  }
`;

export const GET_SECTIONS_ELEMENTS = gql`
  query GetEntity($id: ID!) {
    section(id: $id) {
      id
      elementType
      name
      order
      elements {
        ... on Action {
          id
          name
          descriptions {
            language
            value
          }
          labels {
            language
            value
          }
        }

        ... on Field {
          id
          name
          descriptions {
            language
            value
          }
          labels {
            language
            value
          }
        }
      }
    }
  }
`;
