import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useState } from "react";

export default function AddTraining(props) {

    // statet treenille ja lisäysdialogille
    const emptyTraining = { date: '', duration: '', activity: '', customer: '' };
    const [training, setTraining] = useState(emptyTraining);
    const [open, setOpen] = useState(false);

    // päiväyksen muutoksen hoitava funktio
    const handleDateChange = (date) => {
        setTraining({ ...training, date })
    }

    // tekstikenttien muutokset hoitava funktio
    const handleInputChange = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
    }

    // funktio sille, että tekstikentät tyhjenevät, kun dialogi sulkeutuu
    const resetForm = () => {
        setTraining(emptyTraining);
    }

    // funktio uuden treenin tallentamiseen
    const saveTraining = () => {
        const formattedTraining = { ...training, date: new Date(training.date).toISOString() };
        props.addTraining(formattedTraining);
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

    // return, joka palauttaa New Training napin,
    // josta pääsee lisäämään uuden treenin asiakkaalle
    return (
        <>
            <Button
                onClick={() => setOpen(true)}>
                New training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date and Time"
                            value={training.date}
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                    <TextField
                        label='Duration'
                        name="duration"
                        value={training.duration}
                        onChange={handleInputChange}>

                    </TextField>
                    <TextField
                        label='Activity'
                        name="activity"
                        value={training.activity}
                        onChange={handleInputChange}>

                    </TextField>
                    <Select
                        label="Customer"
                        name="customer"
                        value={training.customer}
                        onChange={handleInputChange}
                        displayEmpty
                    >
                        <MenuItem disabled value="">
                            Select Customer
                        </MenuItem>
                        {props.customers.map((customer, index) => (
                            <MenuItem key={index} value={customer.links[0].href}>
                                {`${customer.firstname} ${customer.lastname}`}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="success"
                        onClick={saveTraining}>
                        Save Training
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