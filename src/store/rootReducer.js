import { combineReducers } from "redux";

import { reducer as entityReducer } from "../slices/entitiesReducer";
import { reducer as sectionsReducer } from "../slices/sectionsReducer";
import { reducer as fieldsReducer } from "../slices/fieldsReducer";
import { reducer as actionsReducer } from "../slices/actionsReducer";

const rootReducer = combineReducers({
  entity: entityReducer,
  section: sectionsReducer,
  field: fieldsReducer,
  action: actionsReducer,
});

export default rootReducer;
