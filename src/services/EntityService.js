import AbstractService from "./AbstractService";
import {
  GET_ENTITIES,
  GET_ENTITY_SECTIONS,
  NB_ENTITIES,
  UPDATE_DEFAULT_ELEMENTS,
} from "../graphql/EntityQueries";

class EntityService extends AbstractService {
  getEntities(first, skip) {
    return this.doRequest(GET_ENTITIES, { first, skip });
  }
  getEntitySections(entityId, elementType) {
    return this.doRequest(GET_ENTITY_SECTIONS, { id: entityId, elementType });
  }
  getNbEntities() {
    return this.doRequest(NB_ENTITIES, {});
  }
  updateDefaultElements(elementId, entityId, elementType) {
    return this.doMutation(UPDATE_DEFAULT_ELEMENTS, {
      elementId,
      entityId,
      elementType,
    });
  }
}

const entityService = new EntityService();
export default entityService;
