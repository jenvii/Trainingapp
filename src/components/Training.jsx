import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";
import "../styles.css";

export default function Training() {

    // states
    const [training, setTraining] = useState('');
    const [customer, setCustomer] = useState('');
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);


    // columns for grid
    const columns = [
        { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => dayjs(params.value).format("DD.MM.YY hh.mm") },
        { field: "duration", sortable: true, filter: true, floatingFilter: true },
        { field: "activity", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Customer", field: "customer.firstname", valueGetter: (params) => `${params.data.customer.firstname} ${params.data.customer.lastname}` },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteTraining(params)}>
                    Delete
                </Button>
        },

    ]

    // fetching trainings
    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText);
                }
            })
            .then(data => setTrainings(data))
            .catch(err => console.error("There is an error with fetch: " + err))
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    const addTraining = (training) => {
        fetch('https://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(training)
        })
            .then(response => {
                if (response.ok) {
                    fetchTrainings();
                } else {
                    alert("Something went wrong")
                }
            })
            .catch(err => console.error(err));
    }

    const deleteTraining = (params) => {
        if (window.confirm('Are you sure you want to delete this training?')) {
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`, { method: 'DELETE' })
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

    const getCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <>
            <AddTraining addTraining={addTraining} customers={customers} />
            <div className="ag-theme-material" >
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columns}
                    pagination={true}
                    paginationAutoPageSize={true}
                >
                </AgGridReact>
            </div >
        </>
    )
}