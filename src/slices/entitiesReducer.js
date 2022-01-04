import { createSlice } from "@reduxjs/toolkit";
import entityService from "../services/EntityService";
import { merge } from "lodash";

/**
 * Tryout game
 */
const initialState = {
  allIds: [123, 28, 33],
  byId: {
    123: {
      id: 123,
      name: "name",
      labels: { value: "labels" },
      descriptions: { value: "description" },
      sections: [],
      defaultFields: [],
      defaultAction: [],
    },
    28: {
      id: 28,
      name: "name",
      labels: { value: "labels" },
      descriptions: { value: "description" },
      sections: [66, 67, 73],
      defaultFields: [15, 134],
      defaultActions: [99],
    },
    33: {
      id: 33,
      name: "name",
      labels: { value: "labels" },
      descriptions: { value: "description" },
      sections: [],
      defaultFields: [],
      defaultActions: [],
    },
  },
  nbMax: 0,
};

const slice = createSlice({
  name: "entity",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    /**
     * Update or create an entity
     */
    createOrUpdateEntities(state, action) {
      const entities = action.payload;
      const updateState = entities.reduce((acc, value) => {
        acc[value.id] = {
          id: value.id,
          name: value.name,
          labels: value.labels[0] ? value.labels[0] : "",
          descriptions: value.descriptions[0] ? value.descriptions[0] : "",
          sections: value.order,
          defaultFields: value.defaultFields,
          defaultActions: value.defaultActions,
        };

        return acc;
      }, {});

      state.byId = merge({ ...state.byId }, { ...updateState });
    },

    /**
     * Update a specific information of entity.
     */
    updateEntitiesInfo(state, action) {
      const entity = action.payload;
      const entities = { ...state.byId };

      const id = Object.keys(entity)[0];
      const updateKey = Object.keys(entity[id])[0];
      const updateEntity = { ...entities[parseInt(id)] };
      updateEntity[updateKey] =
        updateKey === "name"
          ? entity[id][updateKey].value
          : { ...updateEntity[updateKey], value: entity[id][updateKey].value };

      state.byId = { ...state.byId, [parseInt(id)]: updateEntity };
    },

    /**
     * Management of sectionsId to add
     * and delete in the entity.
     */
    updateSectionEntity(state, action) {
      const entitySection = state.byId[action.payload.entityId].sections;
      const idFind = [...entitySection].find(
        (sectionId) =>
          parseInt(sectionId) === parseInt(action.payload.sectionId)
      );

      if (!idFind) {
        entitySection.push(`${action.payload.sectionId}`);
      } else {
        const idRemove = [...entitySection].indexOf(
          parseInt(action.payload.sectionId)
        );
        entitySection.splice(idRemove, 1);
      }
    },

    /**
     * Updates the maximum number of entities
     * returned by the API
     */
    updateNbMax(state, action) {
      state.nbMax = action.payload.data.stats.count;
    },

    /**
     * Management of wanted or unwanted
     * elements in the entity.
     */
    updateDefaultValues(state, action) {
      const entityId = action.payload.entityId;
      const elementId = action.payload.elementId;

      if (action.payload.elementType === "Field") {
        console.log(entityId);
        console.log(state.byId[entityId]);
        const defaultFields = state.byId[entityId].defaultFields;
        const isFind = [...defaultFields].find((id) => id === elementId);
        if (isFind) defaultFields.splice(defaultFields.indexOf(elementId), 1);
        else defaultFields.push(elementId);
      } else {
        const defaultActions = state.byId[entityId].defaultActions;
        const isFind = [...defaultActions].find((id) => id === elementId);
        if (isFind) defaultActions.splice(defaultActions.indexOf(elementId), 1);
        else defaultActions.push(elementId);
      }
    },
  },
});

export const updateDefaultValues =
  (elementId, entityId, elementType) => async (dispatch) => {
    // const { data } = await entityService.updateDefaultElements(
    //   elementId,
    //   entityId,
    //   elementType
    // );

    // console.log(elementId, entityId, elementType);

    // if (data.toggleDefault.id === `${entityId}`)
    dispatch(
      slice.actions.updateDefaultValues({ elementId, entityId, elementType })
    );
    // else
    //   alert(
    //     `The element update ${elementId} in the entity ${entityId} to fail !`
    //   );
  };

export const updateEntities = (entities) => (dispatch) => {
  dispatch(slice.actions.createOrUpdateEntities(entities));
};

export const updateEntitiesInfo = (entity) => (dispatch) => {
  dispatch(slice.actions.updateEntitiesInfo(entity));
};

export const getEntities = (first, skip) => async (dispatch) => {
  // const { data } = await entityService.getEntities(first, skip);
  // dispatch(slice.actions.createOrUpdateEntities(data.allEntities));
  // dispatch(slice.actions.updateNbMax(await entityService.getNbEntities()));
};

export const updateSectionEntity =
  (entityId, sectionId) => async (dispatch) => {
    dispatch(slice.actions.updateSectionEntity({ entityId, sectionId }));
  };

const { reducer } = slice;
export { reducer };
