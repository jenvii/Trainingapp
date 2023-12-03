import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import dayjs from "dayjs";
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";
import "../styles.css";

export default function Training() {

    // statet treeneille ja asiakkaille
    const [trainings, setTrainings] = useState([]);
    const [customers, setCustomers] = useState([]);


    // ag-grid:n sarakkeiden sisällöt, toiminnallisuudet ja leveydet
    const columns = [
        { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => dayjs(params.value).format("DD.MM.YYYY HH:mm"), width: 160 },
        { field: "duration", sortable: true, filter: true, floatingFilter: true, width: 130 },
        { field: "activity", sortable: true, filter: true, floatingFilter: true, width: 140 },
        { headerName: "Customer", field: "customer.firstname", valueGetter: (params) => `${params.data.customer.firstname} ${params.data.customer.lastname}`, width: 150 },
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

    // treenien ja niiden asiakkaiden haku
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

    // treenien haun kutsu
    useEffect(() => {
        fetchTrainings();
    }, [])


    // uuden treenin lisäämiseen tarvittava POST fetch
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
                    alert("Something went wrong with adding a new training")
                }
            })
            .catch(err => console.error(err));
    }

    // treenien poistamiseen tarvittava DELETE fetch
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

    // haetaan asiakkaat erikseen uuden treenin lisäämistä varten
    const getCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.error(err))
    }

    // asiakkaiden haun kutsu
    useEffect(() => {
        getCustomers();
    }, [])

    // return, joka palauttaa uuden treenin lisäämiseen napin sekä 
    // ag-gridin, jossa treenien tiedot näkyvät käyttäjälle
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