import { useEffect, useState } from "react"
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";
import { Button } from "@mui/material";

export default function Training() {

    // states
    const [training, setTraining] = useState('');
    const [customer, setCustomer] = useState('');
    const [trainings, setTrainings] = useState([]);

    // columns for grid
    const columns = [
        { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => dayjs(params.value).format("DD.MM.YY hh.mm") },
        { field: "duration", sortable: true, filter: true, floatingFilter: true },
        { field: "activity", sortable: true, filter: true, floatingFilter: true },
        /*  {
             headerName: "Customer", cellRenderer: params => {
                 if (params.data.links && params.data.links.length > 2 && params.data.links[2].rel === "customer") {
                     return getCustomer(params);
                 }
                 return null;
             },
         }, */
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    onClick={() => deleteTraining(params)}>
                    Delete
                </Button>
        },

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

    /*  const getCustomer = (params) => {
         fetch(params.data.links[2].href)
             .then(response => {
                 if (response.ok) {
                     return response.json();
                 } else {
                     throw new Error("Error in fetch: " + response.statusText);
                 }
             })
             .then(responseData => {
                 setCustomer(responseData);
             })
             .catch(err => console.error(err))
     } */

    useEffect(() => {
        fetchTrainings();
    }, [])

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        fetchTrainings();
                    } else {
                        alert('Something went wrong with deletion: ' + response.statusText);
                    }
                })
                .catch(err => console.error(err));
        }
    }

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