import { createSlice } from "@reduxjs/toolkit";
import entityService from "../services/EntityService";
import sectionService from "../services/SectionService";
import { updateEntities, updateSectionEntity } from "./entitiesReducer";
import { updateFields } from "./fieldsReducer";
import { updateActions } from "./actionsReducer";
import { concat, merge, isEmpty } from "lodash";

const initialState = {
  allIds: [66, 67, 68, 73],
  byId: {
    66: {
      id: 66,
      name: "fieldRootSection",
      elements: [15, 100, 134],
      elementType: "Field",
      entityId: 28,
    },
    67: {
      id: 67,
      name: "sectionFieldName2",
      elements: [154, 291, 301],
      elementType: "Field",
      entityId: 28,
    },
    68: {
      id: 68,
      name: "sectionFieldName2",
      elements: [],
      elementType: "Field",
      entityId: 28,
    },
    73: {
      id: 73,
      name: "actionRootSection",
      elements: [14, 99, 133],
      elementType: "Action",
      entityId: 28,
    },
  },
};

const slice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    /**
     * Sections
     */
    createOrUpdateSections(state, action) {
      const sections = action.payload.sections;
      const entityId = parseInt(action.payload.entityId);

      sections.map((section) => {
        state.allIds[section.id] = section.id;
        const mySection = {
          id: parseInt(section.id),
          name: section.name,
          elements: section.order,
          elementType: section.elementType,
          entityId:
            section.entity && section.entity.id ? section.entity.id : entityId,
        };
        state.byId = { ...state.byId, [section.id]: mySection };

        return section;
      });
    },

    updateElements(state, action) {
      const elements = action.payload.elements.reduce((acc, element) => {
        acc[action.payload.elements.indexOf(element)] = element.value;
        return acc;
      }, []);

      if (action.payload.oldSectionId) {
        let oldElements = state.byId[action.payload.oldSectionId].elements;
        oldElements.splice(
          oldElements.indexOf(action.payload.oldValue.value),
          1
        );
      }
      state.byId[action.payload.sectionId].elements = elements;
    },

    updateName(state, action) {
      state.byId[action.payload.sectionId].name = action.payload.newName;
    },

    delete(state, action) {
      const actions = action.payload;
      const sections = Object.values({ ...state.byId });

      const baseRoot = {
        Field: "fieldRootSection",
        Action: "ActionRootSection",
      };

      // On vérifie si la section est bien
      // la sectionRoot de notre entité.
      const isRootSection = (section, elementRoot) => {
        const mySection = { ...section };
        return (
          parseInt(mySection.entityId) === parseInt(actions.entityId) &&
          mySection.name === elementRoot
        );
      };

      // On récupère la sectionRoot qui récupérera
      // les elements de la section supprimée.
      const rootSection = {
        ...[...sections].find((section) =>
          isRootSection(section, baseRoot[actions.elementType])
        ),
      };

      console.log(rootSection);

      const deleteSection = { ...state.byId[action.payload.sectionId] };

      // Récupération des elements de la section supprimée dans la sectionRoot
      if (!isEmpty(rootSection)) {
        state.byId[rootSection.id].elements = [
          ...rootSection.elements,
          ...deleteSection.elements,
        ];
      }

      delete state.byId[action.payload.sectionId];
    },
  },
});

export const getEntitySection = (entityId, elementType) => async (dispatch) => {
  // const { data } = await entityService.getEntitySections(entityId, elementType);
  // dispatch(updateEntities([data.entity]));
  // dispatch(
  //   slice.actions.createOrUpdateSections({
  //     sections: data.entity.sections,
  //     entityId,
  //   })
  // );
  //TODO: test, wait fix api :
  dispatch(
    updateEntities([
      {
        id: 28,
        name: "nameUpdate",
        labels: [{ value: "labelsUpdate" }],
        descriptions: [{ value: "descriptionsUpdate" }],
        order: [66, 67, 73],
        defaultFields: [15, 134],
        defaultActions: [99],
      },
    ])
  );
};

export const getItemSection = (SectionId) => async (dispatch) => {
  // const { data } = await sectionService.getSectionsElements(SectionId);
  // if (data.section.elementType === "Field")
  //   dispatch(updateFields(data.section.elements));
  // else dispatch(updateActions(data.section.elements));
};

export const updateElements =
  (sectionId, elements, oldSectionId = null, oldValue = null) =>
  async (dispatch) => {
    dispatch(
      slice.actions.updateElements({
        sectionId,
        elements,
        oldSectionId,
        oldValue,
      })
    );
  };

export const initSection = (entityId, elementType) => async (dispatch) => {
  // const { data } = await sectionService.createSection(
  //   entityId,
  //   `Init${elementType}Section`,
  //   elementType
  // );
  // dispatch(
  //   slice.actions.createOrUpdateSections({
  //     sections: [data.createOrUpdateSection],
  //     entityId,
  //   })
  // );
  // dispatch(
  //   updateSectionEntity(entityId, parseInt(data.createOrUpdateSection.id))
  // );
};

export const deleteSection =
  (entityId, sectionId, elementType) => async (dispatch) => {
    dispatch(slice.actions.delete({ sectionId, entityId, elementType }));
    dispatch(updateSectionEntity(entityId, sectionId));
  };

export const updateName = (sectionId, newName) => async (dispatch) => {
  dispatch(slice.actions.updateName({ sectionId, newName }));
};

const { reducer } = slice;
export { reducer };
