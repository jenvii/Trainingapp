import { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";

export default function Training() {

    // states
    const [training, setTraining] = useState('');
    const [trainings, setTrainings] = useState([]);

    // columns for grid
    const columns = [
        { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => dayjs(params.value).format("DD.MM.YY hh.mm") },
        { field: "duration", sortable: true, filter: true, floatingFilter: true },
        { field: "activity", sortable: true, filter: true, floatingFilter: true },
        { field: "customer", sortable: true, filter: true, floatingFilter: true }
    ]

    // fetching trainings
    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText);
                }
            })
            .then(data => setTrainings(data.content))
            .catch(err => console.error("There is an error with fetch: " + err))
    }

    useEffect(() => {
        fetchTrainings();
    })


    return (
        <>
            <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                >

                </AgGridReact>
            </div >
        </>
    )
}