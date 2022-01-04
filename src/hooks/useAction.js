import { useState } from 'react';
import entityService from "../services/EntityService";

const useActions = () => {

    const [actions, setActions] = useState({
        columns: [{"field": "id", "hide": true}],
        rows: [{"id": 0}]
    });


    const formatGirdData = async (actions) => {
        const rows = Object.entries(actions).reduce((acc, value) => {
            const id = Math.floor(Math.random() * 100);
            acc[id] = { id, name: value[0], value: value[1].isDefault, labels: value[1].labels.en, main: value[1].main, inverse: value[1].inverse}
            return acc;
        }, []);

        const columns = [
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

        setActions({ columns, rows });
    }

    const callActions = async (name) => {
        entityService.getEntityById(name).then((actions) => {
            formatGirdData(actions.actions);
        });
    }

    return { callActions, actions };
}

export default useActions;