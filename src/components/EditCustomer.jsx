import { useState } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function EditCustomer(props) {

    // statet asiakkaalle ja dialogin avaamiseen
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false);

    // funktio dialogin avaamiseen, jossa asiakkaan tiedot ovat valmiina tekstikentissä
    const handleOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone
        })
    }

    // funktio tekstikenttien muutoksille
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    // funktio asiakkaan tietojen tallentamiseen
    const handleSave = () => {
        const customerId = props.params.data.links[0].href.split('/').pop();
        props.updateCustomer(`https://traineeapp.azurewebsites.net/api/customers/${customerId}`, customer);
        setOpen(false);
    }

    // funktio dialogin sulkemiseen
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    // return, joka palauttaa napin, jota painamalla 
    // aukeaa asiakkaan tietojen muokkausnäkymä
    return (
        <>
            <Button
                onClick={handleOpen}
                color="secondary">
                Edit customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        label='First name'
                        name="firstname"
                        value={customer.firstname}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='Last name'
                        name="lastname"
                        value={customer.lastname}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='Street address'
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='Postcode'
                        name="postcode"
                        value={customer.postcode}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='City'
                        name="city"
                        value={customer.city}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='Email'
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='Phone'
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}>

                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="success"
                        onClick={handleSave}>
                        Edit customer
                    </Button>
                    <Button
                        color="error"
                        onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}