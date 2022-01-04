import { useState, useCallback } from 'react';
import entityService from "../services/EntityService";
import { isEmpty } from 'lodash';

const useFields = () => {

    const [fields, setFields] = useState({});

    const formatFieldData = useCallback((entity) => {

        // TODO: Get the language of application
        const localLangue = "en";

        console.log(entity);

    

        // Format field data for drag and drop array.
        const data = entity.sections.reduce((acc, section) => {
            const myListTest =  section.elements.reduce((ac, field) => {

                 ac[section.elements.indexOf(field)] = {
                     // get all informations of field
                     ...field, 
                     
                     // get the label fieldModel if not exist in field
                     labels: (!isEmpty(field.labels)) 
                     ? [field.labels.find((label) => 
                        label.language === localLangue)] 
                     : [field.fieldModel.labels.find((label) => 
                        label.language === localLangue)], 

                    // get the description fieldModel if not exist in field
                     descriptions: (!isEmpty(field.descriptions)) 
                     ? [field.descriptions.find((description) => 
                        description.language === localLangue)]
                     : [field.fieldModel.descriptions.find((description) => 
                        description.language === localLangue)], 
                 };
                 return ac;
            }, []);
        
        acc[section.name] = { id: section.name, list: myListTest }
        return acc;
        }, {});

        // Get the default data
        // const listDefault = entity.fields.reduce((acc, value) => {
        //     acc[entity.fields.indexOf(value)] = {...value, descriptions: value.descriptions.fr}; 
        //     return acc;
        // }, []);

        // Get the seetings data
        // const data = Object.values(entity.setting.fields).reduce((acc, value) => {
        //    const myList =  Object.values(value.fields).reduce((ac, val) => {

        //         const defaultField = listDefault.find(f => f.id === val.id);

        //         listDefault.splice(listDefault.indexOf(defaultField), 1);

        //         ac[Object.values(value.fields).indexOf(val)] = {
        //             ...defaultField
        //         };
        //         return ac;
        //    }, []);

        //    acc[value.sectionName.fr] = { id: value.sectionName.fr, list: myList }
        //    return acc;
        // }, {});

        // Add default data not in the seetings
        // data.default = { id: "default", list: listDefault };
        // setFields({ data });

        // console.log(data);

        return { data };
    }, []);

    const createSection = (currentFields, name) => {
        currentFields.data[name] = { id: name, list: [] }
        console.log(currentFields);
        alert("test");
        return currentFields;
    }

    const addNewSectionsField = (name) => {
        setFields((current) => createSection(current, name));
    }

    const removeSection = (currentFields, name) => {
        if (currentFields.data[name] && currentFields.data[name].list.length > 0)
            alert("Vous ne pouvez pas supprimer une section contenant des fields.")
        else 
            delete currentFields.data[name];
        return currentFields;
    }

    const deleteSection = (name) => {
        setFields((current) => removeSection(current, name));
    }

    const callFields = useCallback((name) => {
            entityService.getEntityById(name).then((entity) => {
                formatFieldData(entity);
            });
    }, []);

    return { callFields, fields, addNewSectionsField, setFields, deleteSection, formatFieldData };
}

export default useFields;