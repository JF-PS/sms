import { createSlice } from "@reduxjs/toolkit";
import { overrideActionModels } from "../utils/overrideActionModels";

const initialState = {
  allIds: [14, 99, 133],
  byId: {
    14: {
      id: 14,
      name: "name1",
      labels: "labels1",
      descriptions: "description1",
    },
    99: {
      id: 99,
      name: "name1",
      labels: "labels1",
      descriptions: "description1",
    },
    133: {
      id: 133,
      name: "name1",
      labels: "labels1",
      descriptions: "description1",
    },
  },
};

const slice = createSlice({
  name: "actionItem",
  initialState,
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    },

    /**
     * Actions
     */
    createOrUpdateActions(state, action) {
      const actions = action.payload;
      actions.map((actionItem) => {
        state.byId = {
          ...state.byId,
          [actionItem.id]: overrideActionModels(actionItem),
        };
        return actionItem;
      });
    },
  },
});

export const updateActions = (actions) => async (dispatch) => {
  dispatch(slice.actions.createOrUpdateActions(actions));
};

const { reducer } = slice;
export { reducer };
