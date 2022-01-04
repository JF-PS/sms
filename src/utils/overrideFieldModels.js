import { isEmpty } from "lodash";
export const overrideFieldModels = (field) => {
  const localLangue = "en";

  const myField = {
    id: parseInt(field.id),
    name: field.name,
    labels: field.labels.find((label) => label.language === localLangue).value,
    descriptions: field.descriptions[0],
  };

  return myField;
};
