import Training from './components/Training';
import CustomerList from './components/Customer';
import { Tab, Tabs } from "@mui/material";
import { useState } from 'react';
//import './App.css'

function App() {

  const [value, setValue] = useState('CustomerList');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab value="CustomerList" label="Customer"></Tab>
        <Tab value="Training" label="Training"></Tab>
      </Tabs>
      {value === "CustomerList" && <CustomerList />}
      {value === "Training" && <Training />}
    </>
  )
}

export default App
