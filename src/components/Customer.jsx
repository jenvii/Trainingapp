import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useEffect, useState } from 'react';
import AddCustomer from './AddCustomer';
import { Button } from "@mui/material";

export default function CustomerList() {

    //states
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const RESTURL = 'https://traineeapp.azurewebsites.net/api/customers'

    const getCustomers = () => {
        fetch(RESTURL)
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content)
            })
            .catch(err => console.error(err))
    }

    const addCustomer = (customer) => {
        fetch(RESTURL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    getCustomers();
                } else {
                    alert("Something went wrong");
                }
            })
            .catch(err => console.error(err));
    }

    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(respone => {
                    if (respone.ok) {
                        getCustomers();
                    } else {
                        alert('Something went wrong with deletion: ' + respone.status);
                    }
                })
                .catch(err => console.error(err));
        }
    }


    //columns for grid
    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true },
        { field: "lastname", sortable: true, filter: true, floatingFilter: true },
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
        { field: "postcode", sortable: true, filter: true, floatingFilter: true },
        { field: "city", sortable: true, filter: true, floatingFilter: true },
        { field: "email", sortable: true, filter: true, floatingFilter: true },
        { field: "phone", sortable: true, filter: true, floatingFilter: true },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>
        }
    ];

    //fetching cutomers
    const fetchCustomers = () => {
        fetch(RESTURL)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error("Error in fetch: " + response.statusText)
                }
            })
            .then(data => setCustomers(data.content))
            .catch(err => console.error("There is an error with fetch: " + err))
    }

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                >

                </AgGridReact>
            </div >
        </>
    )
}