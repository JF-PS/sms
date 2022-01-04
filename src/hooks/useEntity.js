import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { getEntityById } from "../actions/entitiesActions";
import { getEntitySections as getSectionsEntity } from "../actions/sectionsActions";
import { getSectionsFields } from "../actions/fieldsActions";
import { ReactReduxContext } from "react-redux";
import { isEmpty } from "lodash";

const useEntity = (id) => {
  const [entity, setEntity] = useState({});
  const [sections, setSections] = useState([]);
  const [fieldsSections, setFieldsSections] = useState({});
  const dispatch = useDispatch();
  const { store } = useContext(ReactReduxContext);
  const [change, setChange] = useState();

  useEffect(() => {}, []);

  // useEffect(() => {
  //   store.subscribe(() => {
  //     setChange(store.getState());
  //     // console.log(store.getState());
  //   });
  // }, [store]);

  // useEffect(() => {
  //   setEntity(dispatch(getEntityById(id)));
  // }, [id, setEntity, dispatch, change]);

  // useEffect(() => {
  //   if (!isEmpty(entity.sections))
  //     setSections(dispatch(getSectionsEntity(entity.sections)));
  // }, [entity, setSections, dispatch, change]);

  // useEffect(() => {
  //   sections.map((section) => {
  //     if (section.elementType === "Field") {
  //       setFieldsSections((current) => ({
  //         ...current,
  //         [section.name]: {
  //           id: section.name,
  //           type: section.elementType,
  //           list: dispatch(getSectionsFields([section.elements])),
  //         },
  //       }));
  //     }
  //   });
  // }, [sections, setSections, dispatch, change]);

  return {
    entity,
    fieldsSections,
  };
};

export default useEntity;
