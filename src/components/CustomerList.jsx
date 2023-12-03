import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useCallback, useEffect, useState, useRef } from 'react';
import AddCustomer from './AddCustomer';
import { Button } from "@mui/material";
import EditCustomer from './EditCustomer';
import "../styles.css";

export default function CustomerList() {

    //state asiakkaille, REST linkki tallennettu ja gridref
    const [customers, setCustomers] = useState([]);
    const RESTURL = 'https://traineeapp.azurewebsites.net/api/customers'
    const gridRef = useRef();

    // ag-gridin sarakkeiden sisällöt, toiminnallisuudet ja leveydet
    const columns = [
        { field: "firstname", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { field: "lastname", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { field: "streetaddress", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { field: "postcode", sortable: true, filter: true, floatingFilter: true, width: 120 },
        { field: "city", sortable: true, filter: true, floatingFilter: true, width: 150 },
        { field: "email", sortable: true, filter: true, floatingFilter: true, width: 200 },
        { field: "phone", sortable: true, filter: true, floatingFilter: true, width: 130 },
        { cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />, width: 150 },
        {
            cellRenderer: params =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCustomer(params)}>
                    Delete
                </Button>,
            width: 150
        }
    ];

    // haetaan asiakkaat
    const fetchCustomers = () => {
        fetch(RESTURL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Error in fetch: " + response.statusText);
                }
            })
            .then(responseData => setCustomers(responseData.content))
            .catch(err => console.error(err))
    }

    // kutsutaan asiakkaiden hakua
    useEffect(() => {
        fetchCustomers();
    }, [])

    // uuden asiakkaan lisäämiseen tarvittava POST fetch
    const addCustomer = (customer) => {
        fetch(RESTURL, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(customer)
        })
            .then(response => {
                if (response.ok) {
                    fetchCustomers();
                } else {
                    alert("Something went wrong with adding a new customer");
                }
            })
            .catch(err => console.error(err));
    }

    // asiakkaan poistoon tarvittava DELETE fetch
    const deleteCustomer = (params) => {
        if (window.confirm('Are you sure that you want to delete this customer?')) {
            fetch(params.data.links[0].href, { method: 'DELETE' })
                .then(respone => {
                    if (respone.ok) {
                        fetchCustomers();
                    } else {
                        alert('Something went wrong with deletion: ' + respone.status);
                    }
                })
                .catch(err => console.error(err));
        }
    }

    // asiakkaan muokkaamiseen tarvittava PUT fetch
    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (response.ok) {
                    fetchCustomers();
                } else {
                    alert('Something went wrong with editing the customer')
                }
            })
            .catch(err => console.error(err))
    }

    // asiakkaiden tietojen export cvs-tiedostoksi
    const exportCsv = useCallback(() => {
        const params = {
            columnKeys: ['firstname', 'lastname', 'streetaddress', 'postcode', 'city', 'email', 'phone']
        }
        gridRef.current.api.exportDataAsCsv(params);
    }, []);

    // return, joka palauttaa asiakkaan lisäys sekä csv export napit
    // sekä ag-gridin, joissa asiakkaiden tiedot näkyvät käyttäjälle
    return (
        <>
            <div className="btn-wrapper">
                <div className="left-side">
                    <AddCustomer addCustomer={addCustomer} />
                </div>
                <div className="right-side">
                    <Button
                        onClick={exportCsv}>
                        Download CSV Export File
                    </Button>
                </div>
            </div>
            <div className="ag-theme-material">
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    ref={gridRef}
                    pagination={true}
                    paginationAutoPageSize={true}
                >

                </AgGridReact>
            </div>
        </>
    )
}