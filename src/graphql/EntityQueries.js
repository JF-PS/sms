import { gql } from "@apollo/client";

export const GET_ENTITIES = gql`
  query GetAllEntities($first: Int, $skip: Int) {
    allEntities(pagination: { first: $first, skip: $skip }) {
      id
      name
      defaultFields
      defaultActions
      labels {
        language
        value
      }
      descriptions {
        language
        value
      }
      order
    }
  }
`;

export const GET_ENTITY_SECTIONS = gql`
  query GetEntity($id: ID!) {
    entity(id: $id) {
      id
      name
      defaultFields
      defaultActions
      labels {
        language
        value
      }
      descriptions {
        language
        value
      }
      sections {
        id
        elementType
        name
        order
        entity {
          id
        }
      }
      order
    }
  }
`;

export const NB_ENTITIES = gql`
  query nbEntities {
    stats {
      count(model: Entity)
    }
  }
`;

export const UPDATE_DEFAULT_ELEMENTS = gql`
  mutation UpdateDefaultElement(
    $entityId: ID!
    $elementId: ID!
    $elementType: SectionTypeEnum!
  ) {
    toggleDefault(
      input: {
        attributes: {
          entityId: $entityId
          elementId: $elementId
          elementType: $elementType
        }
      }
    ) {
      id
    }
  }
`;
