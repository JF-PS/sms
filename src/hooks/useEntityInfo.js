import { useState } from 'react';
import entityService from "../services/EntityService";

const useEntityInfo = () => {

    const [fields, setFields] = useState({
        columns: [{"field": "id", "hide": true}],
        rows: [{"id": 0}]
    });

    const [actions, setActions] = useState({
        columns: [{"field": "id", "hide": true}],
        rows: [{"id": 0}]
    });

    const formatGirdData = async (infos) => {
        console.log(infos);
        const rows1 = Object.entries(infos.fields).reduce((acc, value) => {
            const id = Math.floor(Math.random() * 100);
            acc[id] = { id, name: value[0], value: value[1].isDefault, labels: value[1].labels.en, description: value[1].descriptions.en }
            return acc;
        }, []);
        console.log(rows1);

        const columns1 = [
            {
                "field": "id",
                "hide": true,
            },
            {
                "field": "name",
                "headerName": "name",
                "width": 200,
                "editable": true
            },
            {
                "field": "value",
                "headerName": "value",
                "width": 200,
                "editable": true
            },
            {
                "field": "labels",
                "headerName": "labels",
                "width": 200,
                "editable": true
            },
            {
                "field": "description",
                "headerName": "description",
                "width": 400,
                "editable": true
            }
        ];

        setFields({ columns1, rows1 });

        const rows2 = Object.entries(infos.actions).reduce((acc, value) => {
            const id = Math.floor(Math.random() * 9999);
            acc[id] = { id, name: value[0], value: value[1].isDefault, labels: value[1].labels.en, main: value[1].main, inverse: value[1].inverse}
            return acc;
        }, []);
        console.log(rows2);

        const columns2 = [
            {
                "field": "id",
                "hide": true,
            },
            {
                "field": "name",
                "headerName": "name",
                "width": 200,
                "editable": true
            },
            {
                "field": "value",
                "headerName": "value",
                "width": 200,
                "editable": true
            },
            {
                "field": "labels",
                "headerName": "labels",
                "width": 200,
                "editable": true
            },
            {
                "field": "main",
                "headerName": "main",
                "width": 400,
                "editable": true
            },
            {
                "field": "inverse",
                "headerName": "inverse",
                "width": 400,
                "editable": true
            }
        ];

        setActions({ columns2, rows2 });
    }

    const callEntityByName = async (name) => {
        entityService.getEntityById(name).then((infos) => {
            formatGirdData(infos);
        });
    }

    return { callEntityByName, fields, actions };
}

export default useEntityInfo
