import { createSlice } from "@reduxjs/toolkit";
import { overrideFieldModels } from "../utils/overrideFieldModels";

const initialState = {
  allIds: [15, 100, 134, 154, 291, 301],
  byId: {
    15: {
      id: 15,
      name: "name1",
      labels: "labels1",
      descriptions: "description1",
    },
    100: {
      id: 100,
      name: "name2",
      labels: "labels1",
      descriptions: "description1",
    },
    134: {
      id: 134,
      name: "name3",
      labels: "labels1",
      descriptions: "description1",
    },
    154: {
      id: 154,
      name: "name4",
      labels: "labels1",
      descriptions: "description1",
    },
    291: {
      id: 291,
      name: "name5",
      labels: "labels1",
      descriptions: "description1",
    },
    301: {
      id: 301,
      name: "name6",
      labels: "labels1",
      descriptions: "description1",
    },
  },
};

const slice = createSlice({
  name: "field",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    /**
     * Fields
     */

    createOrUpdateFields(state, action) {
      const fields = action.payload;
      fields.map((field) => {
        state.byId = {
          ...state.byId,
          [field.id]: overrideFieldModels(field),
        };
        return field;
      });

      // console.log({ ...state.byId });
    },
  },
});

export const updateFields = (fields) => async (dispatch) => {
  dispatch(slice.actions.createOrUpdateFields(fields));
};

const { reducer } = slice;
export { reducer };
