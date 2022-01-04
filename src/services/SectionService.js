import AbstractService from "./AbstractService";
import {
  GET_SECTIONS_ELEMENTS,
  CREATE_SECTION,
} from "../graphql/SectionQueries";

class SectionService extends AbstractService {
  getSectionsElements(SectionId) {
    return this.doRequest(GET_SECTIONS_ELEMENTS, { id: SectionId });
  }
  createSection(entityId, name, elementType) {
    return this.doMutation(CREATE_SECTION, { entityId, name, elementType });
  }
}

const sectionService = new SectionService();
export default sectionService;
