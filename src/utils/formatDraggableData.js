import { isEmpty } from "lodash";

/*
 * The purpose of this function is to initialize
 * and update the droppableId of our section elements.
 */
export const formatDraggableData = (
  arraySectionsId,
  sections,
  elementType,
  currentDataList
) => {
  let columnReFormat = {};
  let i = 1;

  // update if deletation :
  const deleteColumn = Object.keys(currentDataList).find(
    (currentColumn) => !arraySectionsId.includes(parseInt(currentColumn))
  );

  if (deleteColumn) {
    delete currentDataList[parseInt(deleteColumn)];
    currentDataList = {};
  }

  arraySectionsId.map((idSection) => {
    // If switch elementType (action and field), we empty the current object
    if (
      !isEmpty(currentDataList) &&
      Object.values(currentDataList)[0].elementType !== elementType
    )
      currentDataList = {};

    const myColumn = Object.values(sections).find(
      (section) =>
        parseInt(section.id) === parseInt(idSection) &&
        section.elementType === elementType
    );

    if (myColumn) {
      if (isEmpty(currentDataList)) {
        const list = myColumn.elements.map((element) => {
          // Each item has to have a unique and consecutive string id
          element = { id: `${i}`, value: element };
          i++;
          return element;
        });

        // Each column has to have a unique id
        columnReFormat[idSection] = {
          id: `${myColumn.id}`,
          list,
          elementType: myColumn.elementType,
        };
      } else {
        const list = currentDataList[idSection].list;

        // We are looking for updated elements
        const deleteValue = list.find(
          (currEl) => !myColumn.elements.includes(currEl.value)
        );

        // We update the elements that have changed section
        if (deleteValue) list.splice(list.indexOf(deleteValue), 1);

        const myList = [...list];

        // We update the position changes of the elements inside the same sections
        myColumn.elements.map((el, index) => {
          list[index] = myList.find((elList) => elList.value === el);
          return el;
        });

        columnReFormat = { ...currentDataList };
      }
    }

    return idSection;
  });

  console.log(columnReFormat);

  return columnReFormat;
};
