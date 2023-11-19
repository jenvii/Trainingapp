import { useState } from "react";
import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export default function EditCustomer(props) {
    // states
    const [customer, setCustomer] = useState({ firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' });
    const [open, setOpen] = useState(false);

    // functions
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

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

    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            setOpen(false);
        }
    }

    const handleSave = () => {
        console.log(props.params.data.links[0].href)
        props.updateCustomer(props.params.data.links[0].href, customer);
        setOpen(false);
    }

    return (
        <>
            <Button
                onClick={handleOpen}>
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
                        onClick={handleSave}>
                        Edit customer
                    </Button>
                    <Button
                        onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>

            </Dialog>
        </>
    )
}