import { Button } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react"

export default function AddCustomer(props) {

    // statet asiakkaalle ja lisäysdialogille
    const emptyCustomer = { firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: '' };
    const [customer, setCustomer] = useState(emptyCustomer);
    const [open, setOpen] = useState(false);

    // tekstikenttien muutokset hoitava funktio
    const handleInputChange = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    }

    // funktio sille, että tekstikentät tyhjenevät, kun dialogi sulkeutuu
    const resetForm = () => {
        setCustomer(emptyCustomer);
    }

    // funktio asiakkaan tallennukseen
    const saveCustomer = () => {
        props.addCustomer(customer);
        resetForm();
        setOpen(false);
    }

    // dialogin sulkemisen hoitava funktio
    const handleClose = (event, reason) => {
        if (reason != 'backdropClick') {
            resetForm();
            setOpen(false);
        }
    }

    // return, joka palauttaa New Customer napin, 
    // josta pääsee lisäämään uuden asiakkaan 
    return (
        <>
            <Button
                onClick={() => setOpen(true)}>
                New Customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
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
                        onClick={saveCustomer}>
                        Add customer
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