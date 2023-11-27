import Training from './components/Training';
import CustomerList from './components/Customer';
import Calendar from './components/Calendar';
import Chart from './components/Chart';
import { Tab, Tabs } from "@mui/material";
import { useState } from 'react';

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
        <Tab value="Calendar" label="Calendar"></Tab>
        <Tab value="Chart" label="Chart"></Tab>
      </Tabs>
      {value === "CustomerList" && <CustomerList />}
      {value === "Training" && <Training />}
      {value === "Calendar" && <Calendar />}
      {value === "Chart" && <Chart />}
    </>
  )
}

export default App
