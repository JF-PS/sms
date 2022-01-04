import { isEmpty } from "lodash";
export const overrideActionModels = (action) => {
  const localLangue = "en";

  const myAction = {
    id: parseInt(action.id),
    name: action.name,
    labels: action.labels.find((label) => label.language === localLangue).value,
    descriptions: action.descriptions[0],
  };

  return myAction;
};
