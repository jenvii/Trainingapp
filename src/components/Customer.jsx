import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import AddCustomer from './AddCustomer';
import { Button } from "@mui/material";
import EditCustomer from './EditCustomer';

export default function CustomerList() {

    //states
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const RESTURL = 'https://traineeapp.azurewebsites.net/api/customers'
    const gridRef = useRef();

    // functions
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

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    setOpen(true);
                    getCustomers();
                } else {
                    alert('Something went wrong')
                }
            })
            .catch(err => console.error(err))
    }

    const exportCsv = useCallback(() => {
        const params = {
            columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone']
        }
        gridRef.current.api.exportDataAsCsv(params);
    }, []);

    //columns for grid
    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { field: "lastname", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { field: "postcode", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { field: "city", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { field: "email", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { field: "phone", sortable: true, filter: true, floatingFilter: true, resizable: true },
        { cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} /> },
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

    useEffect(() => {
        getCustomers();
    }, [])

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <Button
                onClick={exportCsv}>
                Download CSV Export File
            </Button>
            <div className="ag-theme-material" style={{ height: '700px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    ref={gridRef}
                >

                </AgGridReact>
            </div >
        </>
    )
}